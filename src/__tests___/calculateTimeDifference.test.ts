import { calculateTimeDifference } from '../utils/calculateTimeDifference';

describe('calculateTimeDifference', () => {
  it('should return the correct time difference in minutes if the data is old', () => {
    const now = new Date();
    const measuredAt = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const lastUpdated = now.toISOString();
    const result = calculateTimeDifference(lastUpdated, measuredAt);
    
    // Allow for a small margin of error. Having it be hours based but allowing for minutes to have flexibility. 
    expect(result).toMatch(/Data is \d+ minutes old./);
  });

  it('should return the correct time difference in hours if the data is old', () => {
    const now = new Date();
    const measuredAt = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    const lastUpdated = now.toISOString();
    const result = calculateTimeDifference(lastUpdated, measuredAt);
    
    expect(result).toMatch(/Data is \d+ hours old./);
  });
});
