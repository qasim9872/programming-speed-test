import React from 'react';

const SpeedyMetric: React.FC<{
  name: string;
  value: string;
}> = ({ name, value }) => {
  return (
    <div className="widget w-1/4 p-4 rounded-lg bg-white border-l-4 border-purple-400">
      <div className="flex items-center">
        <div className="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
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
  metrics: { timeLeft: string; wordsPerMinute: string; accuracy: string };
}> = ({ metrics }) => {
  const items = Object.entries(metrics).map(([name, value]) => (
    <SpeedyMetric key={name} name={name} value={value} />
  ));

  return <div className="flex w-full lg:w-2/3 justify-around">{items}</div>;
};

export default SpeedyMetrics;
