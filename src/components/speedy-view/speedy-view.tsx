import React, { useState } from 'react';
import { useGlobalConstantsHook } from '../../constants';
import useCountDown from '../../hooks/count-down';

import CodeEditor from './code-editor';
import SpeedyMetrics from './speedy-metrics';

const SpeedyView: React.FC<{}> = () => {
  const [{ speedyCoder: speedyCoderConfig }] = useGlobalConstantsHook();
  const codeToType = speedyCoderConfig.CODE_MAP.javascript;

  const [timeLeft /* , { start, pause, resume, reset } */] = useCountDown(
    speedyCoderConfig.TOTAL_TIME,
    speedyCoderConfig.INTERVAL,
  );

  const [code, setCode] = useState('');

  return (
    <div className="flex-grow flex flex-col w-full lg:w-2/3 mx-10 justify-center items-center">
      <SpeedyMetrics
        metrics={{
          timeLeft: String(timeLeft),
          wordsPerMinute: '25',
          accuracy: '100%',
        }}
      />
      <CodeEditor name="speedy-coder" backgroundText={codeToType} />
    </div>
  );
};

export default SpeedyView;
