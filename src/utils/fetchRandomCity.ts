import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

export async function fetchRandomCity(): Promise<string> {
  try {
    // Long and Lat is NYC
    const response = await axios.get(`https://api.waqi.info/map/bounds/?token=${API_TOKEN}&latlng=40.5,-74.9,40.8,-73.7`);
    const stations = response.data.data;
    
    if (stations.length === 0) {
      throw new Error('No stations found');
    }

    const randomIndex = Math.floor(Math.random() * stations.length);
    const randomCity = stations[randomIndex].station.name;
    return randomCity;
  } catch (error) {
    console.error('Error fetching random city:', error);
    throw error;
  }
}
