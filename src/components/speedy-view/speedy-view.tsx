import React from 'react';
import { useGlobalServicesHook } from '../../services';

const SpeedyView: React.FC<{}> = () => {
  const [services] = useGlobalServicesHook();

  return <>SpeedyView</>;
};

export default SpeedyView;
