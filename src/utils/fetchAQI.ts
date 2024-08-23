import axios from 'axios';
import { AQIData } from '../types/AQIData';

// const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

// export const fetchAQI = async (city: string) => {
//   const url = `https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`;
//   const response = await axios.get(url);
//   console.log('Fetched AQI Data:', response.data.data);
//   return response.data.data;
// };

// fetchAQI('newark').catch(console.error); 
// console.log('API Token!:', process.env.REACT_APP_AQI_API_TOKEN);


const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

export async function fetchAQI(city: string): Promise<AQIData> {
  try {
    const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`);
    const data = response.data.data;
    console.log('hello', data.city.name)

    return {
      aqi: data.aqi,
      city: data.city.name,
      lastUpdated: data.time.iso,
    };
  } catch (error) {
    console.error('Error fetching AQI:', error);
    throw error;
  }
}
