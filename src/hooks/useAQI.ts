import { useState, useEffect } from 'react';
import { fetchAQI } from '../utils/fetchAQI';

export const useAQI = (initialCity: string) => {
  const [aqiData, setAqiData] = useState<any>(null);
  const [city, setCity] = useState(initialCity);

  const fetchData = async (city: string) => {
    const data = await fetchAQI(city);
    setAqiData(data);
  };

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const refreshData = () => {
    fetchData(city);
  };

  return { aqiData, setCity, refreshData };
};
