import React from 'react';
import { render, screen } from '@testing-library/react';
import AQIDisplay from '../components/AQIDisplay';
import { aqiColor } from '../utils/aqiColor';
import { getAQIQuality } from '../utils/getAQIQuality';
import { calculateTimeDifference } from '../utils/calculateTimeDifference';

jest.mock('../utils/aqiColor');
jest.mock('../utils/getAQIQuality');
jest.mock('../utils/calculateTimeDifference');

describe('AQIDisplay', () => {
  const mockAQI = 75;
  const mockLocation = 'Los Angeles';
  const mockLastUpdated = '2024-08-24T10:00:00Z';
  const mockMeasuredAt = '2024-08-24T09:00:00Z';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AQI, Quality, Location, and Last Updated information', () => {
    (aqiColor as jest.Mock).mockReturnValue('green');
    (getAQIQuality as jest.Mock).mockReturnValue('Moderate');
    (calculateTimeDifference as jest.Mock).mockReturnValue('Data is 1 hour old.');

    render(
      <AQIDisplay
        aqi={mockAQI}
        location={mockLocation}
        lastUpdated={mockLastUpdated}
        measuredAt={mockMeasuredAt}
      />
    );

    expect(screen.getByText('AQI: 75')).toBeInTheDocument();
    expect(screen.getByText('AQI Quality: Moderate')).toBeInTheDocument();
    expect(screen.getByText('Location: Los Angeles')).toBeInTheDocument();
    expect(screen.getByText('Last Updated: 8/24/2024, 5:00:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Data is 1 hour old.')).toBeInTheDocument();
  });

  it('displays a warning when data is more than 24 hours old', () => {
    (aqiColor as jest.Mock).mockReturnValue('green');
    (getAQIQuality as jest.Mock).mockReturnValue('Moderate');
    (calculateTimeDifference as jest.Mock).mockReturnValue('Data is 25 hours old.');

    const oldMeasuredAt = '2024-08-23T08:00:00Z'; // More than 24 hours difference

    render(
      <AQIDisplay
        aqi={mockAQI}
        location={mockLocation}
        lastUpdated={mockLastUpdated}
        measuredAt={oldMeasuredAt}
      />
    );

    expect(screen.getByText('Warning: Data is more than 24 hours old and may not reflect current accurate AQI!')).toBeInTheDocument();
  });

  it('does not display the warning when data is less than 24 hours old', () => {
    (aqiColor as jest.Mock).mockReturnValue('green');
    (getAQIQuality as jest.Mock).mockReturnValue('Moderate');
    (calculateTimeDifference as jest.Mock).mockReturnValue('Data is 12 hours old.');

    const recentMeasuredAt = '2024-08-24T02:00:00Z'; // Less than 24 hours difference

    render(
      <AQIDisplay
        aqi={mockAQI}
        location={mockLocation}
        lastUpdated={mockLastUpdated}
        measuredAt={recentMeasuredAt}
      />
    );

    expect(screen.queryByText('Warning: Data is more than 24 hours old and may not reflect current accurate AQI!')).not.toBeInTheDocument();
  });
});
