import ProviderWithContextHoc from '../utils/hoc/provider-with-context';
import myGlobalConfig from './global.constants';
import myCodeExampleMap from './code-example.constants';

const constants = {
  myGlobalConfig,
  myCodeExampleMap,
};

export const {
  Provider: GlobalConstantsProvider,
  useHook: useGlobalConstantsHook,
} = ProviderWithContextHoc(constants);
