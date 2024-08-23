// import React, { useEffect } from 'react';
// import { fetchAQI } from './utils/fetchAQI';

// function App() {
//   useEffect(() => {
//     fetchAQI('newark')
//       .then(data => console.log('data!:', data))
//       .catch(err => console.error('Error:', err));
//   }, []);

//   return <div>App</div>;
// }

// export default App;
import React, { useState, useEffect } from 'react';
import AQIDisplay from './components/AQIDisplay';
import LocationButton from './components/LocationButton';
import RefreshButton from './components/RefreshButton';
import { fetchAQI } from './utils/fetchAQI';
import {fetchRandomCity} from './utils/fetchRandomCity'
import { AQIData } from './types/AQIData';

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
    <div>
      {aqiData && (
        <AQIDisplay
          aqi={aqiData.aqi}
          location={cityName || currentLocation}
          lastUpdated={lastUpdated}
        />
      )}
      <div>
        <LocationButton 
          location="My Location" 
          onClick={() => setCurrentLocation('here')} 
          isActive={currentLocation === 'here'} 
        />
        <LocationButton 
          location="Seattle" 
          onClick={() => setCurrentLocation('seattle')} 
          isActive={currentLocation === 'seattle'} 
        />
        <LocationButton 
          location="Dubai" 
          onClick={() => setCurrentLocation('dubai')} 
          isActive={currentLocation === 'dubai'} 
        />
        <LocationButton 
          location="Explore New York" 
          onClick={handleRandomCityClick} 
          //Avoiding off chance it selects other cities
          isActive={!['here', 'seattle', 'dubai'].includes(currentLocation)}  
        />
      </div>
      <RefreshButton onClick={() => fetchData(currentLocation)} />
    </div>
  );
}

export default App;
