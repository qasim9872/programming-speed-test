import React, { useEffect, useMemo, useState } from 'react';
import { diffChars } from 'diff';

import { useGlobalConstantsHook } from '../../constants';
import { CodeLevel } from '../../constants/speedy-coder.constants';
import useCountDown from '../../hooks/count-down';
import logger from '../../services/logger';

import CodeEditor from './code-editor';
import SpeedyMetrics from './speedy-metrics';
import SpeedyResult from './speedy-result';

const SpeedyView: React.FC<{}> = () => {
  const [{ speedyCoder: speedyCoderConfig }] = useGlobalConstantsHook();

  const [levelIndex, setLevelIndex] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [uncorrectedErrors, setUncorrectedErrors] = useState(0);
  const [correctedWordsPerMinute, setCorrectedWordsPerMinute] = useState(0);

  const [started, setStarted] = useState(false);
  const [typedCode, setTypedCode] = useState('');
  const [levelConfig, setLevelConfig] = useState<CodeLevel>();
  const [avgCorrectedWpm, setAvgCorrectedWpm] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);

  const { timeLeft, actions } = useCountDown(
    speedyCoderConfig.TOTAL_TIME,
    speedyCoderConfig.INTERVAL,
  );
  const {
    start: startCountDown,
    reset: resetCountDown,
    pause: pauseCountDown,
  } = actions;

  const resetState = useMemo(
    () => () => {
      resetCountDown();
      setStarted(false);
      setDisplayResult(false);
      setLevelIndex(0);
      setWordsPerMinute(0);
      setUncorrectedErrors(0);
      setCorrectedWordsPerMinute(0);
      setTypedCode('');
      setAvgCorrectedWpm(0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const endGame = useMemo(
    () => () => {
      logger.info('GAME ENDS');
      setStarted(false);
      setDisplayResult(true);

      // reset state
      pauseCountDown();
    },
    [pauseCountDown],
  );

  useEffect(() => {
    if (!started && !displayResult && typedCode) {
      // this is when the user starts to type
      setStarted(true);
      setDisplayResult(false);

      startCountDown();
      logger.info('starting countdown.');
    }
  }, [started, typedCode, displayResult, startCountDown]);

  // update level config
  useEffect(() => {
    const levels = speedyCoderConfig.CODE_LEVELS;
    logger.info(`setting level config => ${levelIndex}`, levels[levelIndex]);

    // update average score across different levels
    setAvgCorrectedWpm((previousAvgCorrectedWpm) =>
      Math.floor((previousAvgCorrectedWpm + correctedWordsPerMinute) / 2),
    );

    if (levels[levelIndex]) {
      setTypedCode(''); // reset text
      const nextLevel = levels[levelIndex];
      setLevelConfig(nextLevel);
    } else {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  // calculate uncorrected errors
  useEffect(() => {
    if (!levelConfig?.codeToType) {
      return;
    }

    const typedTextLength = typedCode.length;
    const originalEquivalent = levelConfig.codeToType.substring(
      0,
      typedTextLength,
    );

    const diffs = diffChars(originalEquivalent, typedCode);
    const uncorrectedErrorsCount = diffs.reduce(
      (errorCount, diff) =>
        diff.removed ? errorCount + (diff.count || 0) : errorCount,
      0,
    );
    setUncorrectedErrors(uncorrectedErrorsCount);
  }, [levelConfig, typedCode]);

  // move to the next level when current level is finished
  useEffect(() => {
    if (typedCode.length === levelConfig?.codeToType.length) {
      setLevelIndex((previousLevel) => previousLevel + 1);
    }
  }, [levelConfig, typedCode]);

  // end game when timer ends
  useEffect(() => {
    if (timeLeft === 0 && started) {
      endGame();
    }
  }, [started, endGame, timeLeft]);

  // calculate wpm and corrected wpm
  useEffect(() => {
    const typedCodeLength = typedCode.length;
    const timeTakenMs = speedyCoderConfig.TOTAL_TIME - timeLeft;
    const timeTakenSeconds = timeTakenMs / 1000;
    const timeTakenMinutes = timeTakenSeconds / 60 || 1; // fallback to 1 so it does not give Infinity

    const averageWordsTyped = typedCodeLength / 5;
    const wpm = Math.floor(averageWordsTyped / timeTakenMinutes);
    const correctedWpm = Math.floor(
      (averageWordsTyped - uncorrectedErrors) / timeTakenMinutes,
    );

    logger.debug({
      wpm,
      typedCodeLength,
      uncorrectedErrors,
      timeTakenMinutes,
    });

    setWordsPerMinute(wpm);
    setCorrectedWordsPerMinute(correctedWpm < 0 ? 0 : correctedWpm);
  }, [timeLeft, typedCode, speedyCoderConfig, uncorrectedErrors]);

  return (
    <div className="flex-grow flex flex-col w-full mx-10 justify-center items-center">
      <SpeedyMetrics
        metrics={{
          level: { index: levelIndex, title: levelConfig?.title },
          timeLeft: timeLeft || speedyCoderConfig.TOTAL_TIME,
          wordsPerMinute,
          uncorrectedErrors,
          correctedWordsPerMinute,
        }}
      />
      {levelConfig && (
        <CodeEditor
          name="speedy-coder"
          language="javascript"
          code={typedCode}
          backgroundText={levelConfig.codeToType}
          onCodeUpdate={(code) => setTypedCode(code)}
        />
      )}

      <SpeedyResult
        open={displayResult}
        onCloseModal={() => resetState()}
        score={avgCorrectedWpm}
      />
    </div>
  );
};

export default SpeedyView;
