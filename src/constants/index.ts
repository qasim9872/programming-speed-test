import ProviderWithContextHoc from '../utils/hoc/provider-with-context';
import myGlobalConfig from './global.constants';
import speedyCoder from './speedy-coder.constants';

const constants = {
  myGlobalConfig,
  speedyCoder,
};

export const {
  Provider: GlobalConstantsProvider,
  useHook: useGlobalConstantsHook,
} = ProviderWithContextHoc(constants);
