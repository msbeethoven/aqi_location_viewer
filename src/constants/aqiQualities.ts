// from https://aqicn.org/scale/
export const AQI_QUALITY = {
  GOOD: 'Good',
  MODERATE: 'Moderate',
  UNHEALTHY_FOR_SENSITIVE_GROUPS: 'Unhealthy for Sensitive Groups',
  UNHEALTHY: 'Unhealthy',
  VERY_UNHEALTHY: 'Very Unhealthy',
  HAZARDOUS: 'Hazardous',
  UNKNOWN: 'Unknown at this time'
};

export const AQI_QUALITY_RANGES = {
  [AQI_QUALITY.GOOD]: [0, 50],
  [AQI_QUALITY.MODERATE]: [51, 100],
  [AQI_QUALITY.UNHEALTHY_FOR_SENSITIVE_GROUPS]: [101, 150],
  [AQI_QUALITY.UNHEALTHY]: [151, 200],
  [AQI_QUALITY.VERY_UNHEALTHY]: [201, 300],
  [AQI_QUALITY.HAZARDOUS]: [301, Infinity],
};
