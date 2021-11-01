import FakeHttpClient from '../__mocks__/fake-http-client';
import DEFAULT_ITEMS_ARRAY from '../__mocks__/default-items-array';
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

  it('should return a reduced set of items if filters were specified', async () => {
    const result = await itemApi.search('iPhone', '', 5, 1);
    expect(result).toHaveLength(1);
  });

  it('should return an empty list if an error occurs while performing the http request', async () => {
    httpClient.setSimulateError(true);
    const result = await itemApi.search('', '', 5, 1);
    expect(result).toHaveLength(0);
  });

  describe('filter', () => {
    it('should filter by text', () => {
      const filterResult = ItemApi.filter(DEFAULT_ITEMS_ARRAY, 'iPhone');
      expect(filterResult).toHaveLength(1);
      expect(filterResult[0].title).toBe(DEFAULT_ITEMS_ARRAY[0].title);
    });

    it('should filter by price', () => {
      const filterResult = ItemApi.filter(DEFAULT_ITEMS_ARRAY, '300');
      expect(filterResult).toHaveLength(1);
      expect(filterResult[0].title).toBe(DEFAULT_ITEMS_ARRAY[1].title);
    });
  });

  describe('filterByText', () => {
    it('should filter by title', () => {
      const filter = 'test';
      expect(ItemApi.filterByText(filter, 'This is a TeSt title', 'Description', 'Email')).toBe(true);
    });

    it('should filter by description', () => {
      const filter = 'test';
      expect(ItemApi.filterByText(filter, 'Title', 'DescripTESTion', 'Email')).toBe(true);
    });

    it('should filter by email', () => {
      const filter = 'test';
      expect(ItemApi.filterByText(filter, 'Title', 'Description', 'EmailTest')).toBe(true);
    });

    it('should return false if there is not a match', () => {
      const filter = 'test';
      expect(ItemApi.filterByText(filter, 'Title', 'Description', 'Email')).toBe(false);
    });
  });

  describe('filterByNumber', () => {
    it('should return true if the price is lower or equal to the filter', () => {
      expect(ItemApi.filterByNumber('40', 50)).toBe(true);
    });

    it('should return false if the price is lower or equal to the filter', () => {
      expect(ItemApi.filterByNumber('51', 50)).toBe(false);
    });
  });
});
