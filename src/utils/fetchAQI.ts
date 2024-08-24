import axios from 'axios';
import { AQIData } from '../types/AQIData';

const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

export async function fetchAQI(city: string): Promise<AQIData> {
  try {
    const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`);
    const data = response.data.data;

    if (!data || !data.city || !data.city.name) {
      throw new Error('Invalid data format');
    }

    return {
      aqi: data.aqi,
      city: data.city.name,
      lastUpdated: new Date().toISOString(),
      measuredAt: data.time.iso,
    };
  } catch (error) {
    console.error('Error fetching AQI:', error);
    throw error;
  }
}
