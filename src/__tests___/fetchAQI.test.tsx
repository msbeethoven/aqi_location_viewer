import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';
import { fetchAQI } from '../utils/fetchAQI';
import { fetchRandomCity } from '../utils/fetchRandomCity';

// Mock the fetchAQI function
jest.mock('../utils/fetchAQI', () => ({
  fetchAQI: jest.fn(),
}));

// Mock the fetchRandomCity function
jest.mock('../utils/fetchRandomCity', () => ({
  fetchRandomCity: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    (fetchAQI as jest.Mock).mockResolvedValue({
      aqi: 75,
      city: 'Los Angeles',
      lastUpdated: new Date().toISOString(),
      measuredAt: new Date().toISOString(),
    });
    (fetchRandomCity as jest.Mock).mockResolvedValue('Los Angeles');
  });

  test('renders and fetches data on location change', async () => {
    render(<App />);

    // Trigger a location change
    fireEvent.click(screen.getByText('Los Angeles'));

    await waitFor(() => {
      expect(screen.getByText('AQI: 75')).toBeInTheDocument();
      expect(screen.getByText('Location: Los Angeles')).toBeInTheDocument();
    });
  });
});
