import React from 'react';
import { useGlobalServicesHook } from '../../services';

const SpeedyView: React.FC<{}> = () => {
  const [services] = useGlobalServicesHook();
  services.logger.info('initializing speedy view');

  return <>SpeedyView</>;
};

export default SpeedyView;
