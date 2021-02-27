import React from 'react';
import { Rules, SpeedyView } from '../../components';

const HomePageView: React.FC<{}> = () => {
  return (
    <div className="h-full w-full lg:w-2/3 flex-col flex-grow flex justify-center items-center">
      <Rules />
      <SpeedyView />
    </div>
  );
};

export default HomePageView;
