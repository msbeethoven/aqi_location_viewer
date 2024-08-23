import React, { useEffect } from 'react';
import { fetchAQI } from './utils/fetchAQI';

function App() {
  useEffect(() => {
    fetchAQI('newark')
      .then(data => console.log('data!:', data))
      .catch(err => console.error('Error:', err));
  }, []);

  return <div>App</div>;
}

export default App;
