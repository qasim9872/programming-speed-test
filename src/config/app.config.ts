export const {
  NODE_ENV,
  REACT_APP_NAME,
  REACT_APP_LOG_LEVEL,
  REACT_APP_FULL_URL,
} = process.env;
export const IS_PROD = NODE_ENV === 'production';

export const NAME = REACT_APP_NAME || 'Speedy Coder';
export const LOG_LEVEL = REACT_APP_LOG_LEVEL || 'info';
export const FULL_URL = REACT_APP_FULL_URL || '';
