import ProviderWithContextHoc from '../utils/hoc/provider-with-context';

import logger from './logger';

export const globalServices = {
  logger,
};

export const {
  Provider: GlobalServicesProvider,
  useHook: useGlobalServicesHook,
} = ProviderWithContextHoc(globalServices);
