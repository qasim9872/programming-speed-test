import React, { useEffect, useState } from 'react';
import { useGlobalConstantsHook } from '../../constants';
import { CodeLevel } from '../../constants/speedy-coder.constants';
import useCountDown from '../../hooks/count-down';

import CodeEditor from './code-editor';
import SpeedyMetrics from './speedy-metrics';

const SpeedyView: React.FC<{}> = () => {
  const [{ speedyCoder: speedyCoderConfig }] = useGlobalConstantsHook();

  const [levelIndex, setLevelIndex] = useState(0);
  const [levelConfig, setLevelConfig] = useState<CodeLevel>();

  const { timeLeft, actions } = useCountDown(
    speedyCoderConfig.TOTAL_TIME,
    speedyCoderConfig.INTERVAL,
  );
  const { start: startCountDown, reset: resetCountDown } = actions;

  // set state to level 1
  useEffect(() => {
    setLevelIndex(0);
    // startCountDown();
  }, []);

  // update level config
  useEffect(() => {
    const levels = speedyCoderConfig.CODE_LEVELS;
    const currentLevel = levels[levelIndex];

    setLevelConfig(currentLevel);
  }, [levelIndex, speedyCoderConfig]);

  return (
    <div className="flex-grow flex flex-col w-full lg:w-2/3 mx-10 justify-center items-center">
      <SpeedyMetrics
        metrics={{
          level: `${levelIndex + 1}. ${levelConfig?.title}`,
          timeLeft: timeLeft || speedyCoderConfig.TOTAL_TIME,
          wordsPerMinute: '25',
          accuracy: '100%',
        }}
      />
      {levelConfig && (
        <CodeEditor
          name="speedy-coder"
          backgroundText={levelConfig.codeToType}
        />
      )}
    </div>
  );
};

export default SpeedyView;
