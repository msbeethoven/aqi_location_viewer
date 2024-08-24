import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';
import { fetchAQI } from '../utils/fetchAQI';
import { fetchRandomCity } from '../utils/fetchRandomCity';

jest.mock('../utils/fetchAQI');
jest.mock('../utils/fetchRandomCity');

describe('App Component', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('handles errors when fetching data', async () => {
    (fetchAQI as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    render(<App />);

    fireEvent.click(screen.getByText('Los Angeles'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching data:', expect.any(Error));
    });
  });

  it('fetches and displays data correctly', async () => {
    (fetchAQI as jest.Mock).mockResolvedValue({
      aqi: 75,
      city: 'Los Angeles',
      lastUpdated: new Date().toISOString(),
      measuredAt: new Date().toISOString(),
    });

    (fetchRandomCity as jest.Mock).mockResolvedValue('Los Angeles');

    render(<App />);

    fireEvent.click(screen.getByText('Los Angeles'));

    await waitFor(() => {
      expect(screen.getByText('AQI: 75')).toBeInTheDocument();
    });
  });

});
