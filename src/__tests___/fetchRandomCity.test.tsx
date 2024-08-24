import axios from 'axios';
import { fetchRandomCity } from '../utils/fetchRandomCity';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchRandomCity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a random city name from the API', async () => {
    // Mock cities are defined
    const mockResponse = {
      data: {
        data: [
          { station: { name: 'New York' } },
          { station: { name: 'Los Angeles' } },
          { station: { name: 'Chicago' } },
        ],
      },
    };
    
    // Mock axios.get to return the mockResponse
    mockedAxios.get.mockResolvedValue(mockResponse);
    
    // Call the function and assert the result
    const city = await fetchRandomCity();
    expect(['New York', 'Los Angeles', 'Chicago']).toContain(city);
  });

  it('should throw an error if no stations are found', async () => {
    const mockResponse = {
      data: {
        data: [],
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    await expect(fetchRandomCity()).rejects.toThrow('No stations found');
  });

  it('should throw an error if there is a network issue', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(fetchRandomCity()).rejects.toThrow('Network Error');
  });
});
