import React from 'react';
import { getAQIQuality } from '../utils/getAQIQuality';
import { aqiColor } from '../utils/aqiColor';

type AQIDisplayProps = {
  aqi: number;
  location: string;
  lastUpdated: string;
};

function AQIDisplay({ aqi, location, lastUpdated }: AQIDisplayProps) {
  const quality = getAQIQuality(aqi);
  const color = aqiColor(aqi);

  return (
    <div>
      <h1 style={{ color: color }}>AQI: {aqi}</h1> 
      <p>AQI Quality: {quality}</p>
      <p>Location: {location}</p>
      <p>Last Updated: {lastUpdated}</p>
    </div>
  );
}

export default AQIDisplay;
