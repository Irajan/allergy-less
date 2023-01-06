import {allergySeverity} from './appConstants';

export const fontSizes = {
  xsm: 12,
  sm: 14,
  normal: 16,
  lg: 20,
  xlg: 24,
};

export const fontWeights = {
  thin: '100',
  xLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  xBold: '800',
};

export const severityTextColor = {
  [allergySeverity.CRITICAL]: '#ff003f',
  [allergySeverity.HIGH]: '#ffa800',
  [allergySeverity.LOW]: '#4caf50',
};

export const severityBgColor = {
  [allergySeverity.CRITICAL]: '#ff003f33',
  [allergySeverity.HIGH]: '#ffa80033',
  [allergySeverity.LOW]: '#2ecc712a',
};
