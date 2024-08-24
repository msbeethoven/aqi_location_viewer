import React, { useEffect, useState } from 'react';
import { getAQIQuality } from '../utils/getAQIQuality';
import { aqiColor } from '../utils/aqiColor';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';
import '../styles/AQIDisplay.css';

type AQIDisplayProps = {
  aqi: number;
  location: string;
  lastUpdated: string;
  measuredAt: string;
};

function AQIDisplay({ aqi, location, lastUpdated, measuredAt }: AQIDisplayProps) {
  const [fadeIn, setFadeIn] = useState(false);
  const quality = getAQIQuality(aqi);
  const color = aqiColor(aqi);
  const timeDifference = calculateTimeDifference(lastUpdated, measuredAt);
  const formattedMeasuredAt = new Date(measuredAt).toLocaleString();

  useEffect(() => {
    setFadeIn(false); 
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 100); 

    return () => clearTimeout(timeout);
  }, [aqi, location, lastUpdated, measuredAt]);

  const timeDifferenceInHours =
    (new Date(lastUpdated).getTime() - new Date(measuredAt).getTime()) /
    (1000 * 60 * 60);

  const isDataOld = timeDifferenceInHours > 24;

  return (
    <div className={`aqi-container ${fadeIn ? 'fade-in' : ''}`}>
      <h1 style={{ color: color }}>AQI: {aqi}</h1> 
      <p>AQI Quality: {quality}</p>
      <p>Location: {location}</p>
      <p>Last Updated: {formattedMeasuredAt}</p>
      <p>{timeDifference}</p>

      {isDataOld && (
        <p style={{ color: 'red' }}>
          Warning: Data is more than 24 hours old and may not reflect current accurate AQI!
        </p>
      )}
    </div>
  );
}

export default AQIDisplay;
