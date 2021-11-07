import { expect } from '@jest/globals';
import AxiosClient from '../libs/axios-client';

// AxiosClient integration tests
describe('Test AxiosClient class', () => {
  let axiosClient:AxiosClient;
  beforeAll(() => {
    axiosClient = new AxiosClient();
  });

  it('should properly perform a basic http get request', async () => {
    const httpResult = await axiosClient.get('https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json');
    expect(httpResult.items).toHaveLength(20);
  });

  it('should return null when an exception occurs', async () => {
    window.console.error = jest.fn();
    const httpResult = await axiosClient.get('');
    expect(httpResult).toBe(null);
  });
});
