import { AQI_QUALITY, AQI_QUALITY_RANGES } from '../constants/aqiQualities';

export function getAQIQuality(aqi: number): string {
  for (const [quality, [min, max]] of Object.entries(AQI_QUALITY_RANGES)) {
    if (aqi >= min && aqi <= max) {
      return quality;
    }
  }
  return AQI_QUALITY.UNKNOWN; // Default case if errors or an edge case city
}
