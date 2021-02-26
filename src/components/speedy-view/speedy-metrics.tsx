import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { GiPunch, GiBullseye } from 'react-icons/gi';
import { MdTimer } from 'react-icons/md';
import { IoMdSpeedometer } from 'react-icons/io';

const SpeedyMetric: React.FC<{
  name: string;
  value: string;
  color?: string;
  Icon: IconType;
}> = ({ name, value, Icon, color }) => {
  return (
    <div
      className={`widget w-1/4 p-4 mx-1 rounded-lg bg-white border-l-4 border-${color}-300`}
    >
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center h-12 w-12 p-3.5 bg-${color}-100 text-${color}-500 text-white rounded-full mr-3`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-lg">{value}</div>
          <div className="text-sm text-gray-400 capitalize">{name}</div>
        </div>
      </div>
    </div>
  );
};

const SpeedyMetrics: React.FC<{
  metrics: {
    level: string;
    timeLeft: number;
    wordsPerMinute: number;
    accuracy: number;
  };
}> = ({ metrics }) => {
  const [displayTimeLeft, setDisplayTimeLeft] = useState('');

  useEffect(() => {
    const MILLISECONDS_IN_SECOND = 1000;
    const countDownTimeInSeconds = metrics.timeLeft / MILLISECONDS_IN_SECOND;
    setDisplayTimeLeft(`${countDownTimeInSeconds}s`);
  }, [metrics.timeLeft]);

  return (
    <div className="flex w-full lg:w-2/3 justify-around">
      <SpeedyMetric
        name="Level"
        value={metrics.level}
        Icon={GiPunch}
        color="purple"
      />
      <SpeedyMetric
        name="Time Left"
        value={displayTimeLeft}
        Icon={MdTimer}
        color="yellow"
      />
      <SpeedyMetric
        name="Words Per Minute"
        value={String(metrics.wordsPerMinute)}
        Icon={IoMdSpeedometer}
        color="blue"
      />
      <SpeedyMetric
        name="Accuracy"
        value={`${metrics.accuracy}%`}
        Icon={GiBullseye}
        color="green"
      />
    </div>
  );
};

export default SpeedyMetrics;
