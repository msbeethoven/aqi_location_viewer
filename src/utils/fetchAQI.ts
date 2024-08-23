import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

export const fetchAQI = async (city: string) => {
  const url = `https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`;
  const response = await axios.get(url);
  console.log('Fetched AQI Data:', response.data.data);
  return response.data.data;
};

fetchAQI('newark').catch(console.error); 
console.log('API Token!:', process.env.REACT_APP_AQI_API_TOKEN);