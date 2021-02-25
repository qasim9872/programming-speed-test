import React from 'react';
import { SpeedyView } from '../../components';

const HomePageView: React.FC<{}> = () => {
  return (
    <div className="h-full flex-grow flex justify-center items-center">
      <SpeedyView />
    </div>
  );
};

export default HomePageView;
