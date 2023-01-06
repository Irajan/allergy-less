export const allergySeverity = {
  HIGH: 'HIGH',
  LOW: 'LOW',
  CRITICAL: 'CRITICAL',
};

export const allergySeverityLabel = {
  [allergySeverity.HIGH]: 'High',
  [allergySeverity.LOW]: 'Low',
  [allergySeverity.CRITICAL]: 'Critical',
};

export const allergySeverityOptions = [
  {
    label: allergySeverityLabel[allergySeverity.HIGH],
    value: allergySeverity.HIGH,
  },
  {
    label: allergySeverityLabel[allergySeverity.LOW],
    value: allergySeverity.LOW,
  },
  {
    label: allergySeverityLabel[allergySeverity.CRITICAL],
    value: allergySeverity.CRITICAL,
  },
];
