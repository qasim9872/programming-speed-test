import React from 'react';
import layouts from './layouts';
import LayoutBuilder from './layouts/_shared/layout-builder';
import { GlobalConstantsProvider } from './constants';
import { GlobalServicesProvider } from './services';
import WrapComponentInProvidersHoc from './utils/hoc/wrap-component-in-providers';

export default WrapComponentInProvidersHoc(
  () => <LayoutBuilder layouts={layouts} />,
  [GlobalServicesProvider, GlobalConstantsProvider],
);
