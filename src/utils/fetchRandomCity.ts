import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_AQI_API_TOKEN;

export async function fetchRandomCity(): Promise<string> {
  try {
    // Long and Lat is NYC
    const response = await axios.get(`https://api.waqi.info/map/bounds/?token=${API_TOKEN}&latlng=40.477399,-74.259090,40.917577,-73.700272`);
    const stations = response.data.data;
    
    if (stations.length === 0) {
      throw new Error('No stations found');
    }

    const randomIndex = Math.floor(Math.random() * stations.length);
    const randomCity = stations[randomIndex].station.name;
    console.log('this is being read')
    return randomCity;
  } catch (error) {
    console.error('Error fetching random city:', error);
    throw error;
  }
}
