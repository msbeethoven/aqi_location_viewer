import React, { useState, useEffect } from 'react';
import AQIDisplay from './AQIDisplay';
import LocationButton from './LocationButton';
import RefreshButton from './RefreshButton';
import { fetchAQI } from '../utils/fetchAQI';
import {fetchRandomCity} from '../utils/fetchRandomCity'
import { AQIData } from '../types/AQIData';
import '../styles/App.css';

function App() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [currentLocation, setCurrentLocation] = useState('here');
  const [lastUpdated, setLastUpdated] = useState('');
  const [cityName, setCityName] = useState(''); 

  useEffect(() => {
    fetchData(currentLocation);
  }, [currentLocation]);

  const fetchData = async (location: string) => {
    try {
      const data = await fetchAQI(location);
      setAqiData(data);
      setCityName(data.city)
      setLastUpdated(new Date(data.lastUpdated).toLocaleString());
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleRandomCityClick = async () => {
    try {
      const randomCity = await fetchRandomCity();
      setCurrentLocation(randomCity);
    } catch (err) {
      console.error('Error fetching random city:', err);
    }
  };

  return (
    <div className='center-container'>
      {aqiData && (
        <AQIDisplay
          aqi={aqiData.aqi}
          location={cityName || currentLocation}
          lastUpdated={lastUpdated}
          measuredAt={aqiData.measuredAt}
        />
      )}
      <div>
        <LocationButton 
          location="My Location" 
          onClick={() => setCurrentLocation('here')} 
          isActive={currentLocation === 'here'} 
        />
        <LocationButton 
          location="Los Angeles" 
          onClick={() => setCurrentLocation('los angeles')} 
          isActive={currentLocation === 'los angeles'} 
        />
        <LocationButton 
          location="Dubai" 
          onClick={() => setCurrentLocation('dubai')} 
          isActive={currentLocation === 'dubai'} 
        />
        <LocationButton 
          location="Explore New Jersey and New York" 
          onClick={handleRandomCityClick} 
          //Avoiding off chance it selects other hard coded cities
          isActive={!['here', 'los angeles', 'dubai'].includes(currentLocation)}  
        />
      </div>
      <RefreshButton onClick={() => fetchData(currentLocation)} />
    </div>
  );
}

export default App;
