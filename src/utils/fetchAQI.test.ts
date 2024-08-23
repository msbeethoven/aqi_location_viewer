import { fetchAQI } from './fetchAQI';

(async () => {
  const data = await fetchAQI('newark');
  console.log('Test fetch AQI data:', data);
})();
