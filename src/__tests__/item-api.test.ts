import FakeHttpClient from '../__mocks__/fake-http-client';
import ItemApi from '../api/item-api';

describe('Test ItemApi class', () => {
  let httpClient:FakeHttpClient;
  let itemApi:ItemApi;

  beforeAll(() => {
    httpClient = new FakeHttpClient();
    itemApi = new ItemApi(httpClient);
  });

  it('should retrieve a list of items when searching', async () => {
    const result = await itemApi.search('', '', 5, 1);
    expect(result).toHaveLength(2);
  });

  it('should return an empty list if an error occurs while performing the http request', async () => {
    httpClient.setSimulateError(true);
    const result = await itemApi.search('', '', 5, 1);
    expect(result).toHaveLength(0);
  });
});
