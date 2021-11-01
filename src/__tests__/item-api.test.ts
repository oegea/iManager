import axios from 'axios';
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
    const result = await itemApi.search('', '', 5, 0);
    expect(result).toHaveLength(2);
  });

  it('should return a reduced set of items if filters were specified', async () => {
    const result = await itemApi.search('iPhone', 'Title', 5, 0);
    expect(result).toHaveLength(1);
  });

  it('should return an empty list if an error occurs while performing the http request', async () => {
    httpClient.setSimulateError(true);
    const result = await itemApi.search('', '', 5, 0);
    expect(result).toHaveLength(0);
  });

  describe('filter', () => {
    it('should filter by text', () => {
      const filterResult = ItemApi.filter(DEFAULT_ITEMS_ARRAY, 'iPhone');
      expect(filterResult).toHaveLength(1);
      expect(filterResult[0].title).toBe('iPhone 11');
    });

    it('should filter by price', () => {
      const filterResult = ItemApi.filter(DEFAULT_ITEMS_ARRAY, '300');
      expect(filterResult).toHaveLength(1);
      expect(filterResult[0].title).toBe('Bolso piel marca Hoss');
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

  describe('getFieldsForSort', () => {
    it('should properly recover the title', () => {
      const firstItem = DEFAULT_ITEMS_ARRAY[0];
      const secondItem = DEFAULT_ITEMS_ARRAY[1];
      const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(firstItem, secondItem, 'Title');
      expect(firstItemValue).toBe(firstItem.title);
      expect(secondItemValue).toBe(secondItem.title);
    });

    it('should properly recover the email', () => {
      const firstItem = DEFAULT_ITEMS_ARRAY[0];
      const secondItem = DEFAULT_ITEMS_ARRAY[1];
      const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(firstItem, secondItem, 'Email');
      expect(firstItemValue).toBe(firstItem.email);
      expect(secondItemValue).toBe(secondItem.email);
    });

    it('should properly recover the description', () => {
      const firstItem = DEFAULT_ITEMS_ARRAY[0];
      const secondItem = DEFAULT_ITEMS_ARRAY[1];
      const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(firstItem, secondItem, 'Description');
      expect(firstItemValue).toBe(firstItem.description);
      expect(secondItemValue).toBe(secondItem.description);
    });

    it('should properly recover the price', () => {
      const firstItem = DEFAULT_ITEMS_ARRAY[0];
      const secondItem = DEFAULT_ITEMS_ARRAY[1];
      const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(firstItem, secondItem, 'Price');
      expect(firstItemValue).toBe(parseInt(firstItem.price, 10));
      expect(secondItemValue).toBe(parseInt(secondItem.price, 10));
    });

    it('should recover title when an invalid field is specified', () => {
      const firstItem = DEFAULT_ITEMS_ARRAY[0];
      const secondItem = DEFAULT_ITEMS_ARRAY[1];
      const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(firstItem, secondItem, 'NotValid');
      expect(firstItemValue).toBe(firstItem.title);
      expect(secondItemValue).toBe(secondItem.title);
    });
  });

  describe('sort', () => {
    it('should return an ordered list by Title', () => {
      const sortResult = ItemApi.sort(DEFAULT_ITEMS_ARRAY, 'Title');
      expect(sortResult).toHaveLength(2);
      expect(sortResult[0].title).toBe('Bolso piel marca Hoss');
    });
  });

  describe('evaluateOrder', () => {
    it('should return 0 if two fields are identical', () => {
      const items = [{
        title: 'a', description: '', price: '', email: '', image: '',
      }, {
        title: 'a', description: '', price: '', email: '', image: '',
      }];
      expect(ItemApi.evaluateOrder('Title', items[0], items[1])).toBe(0);
    });
  });

  describe('pageItems', () => {
    it('should return the expected amount of items while paging', () => {
      const firstPageResult = ItemApi.pageItems(DEFAULT_ITEMS_ARRAY, 0, 1);
      expect(firstPageResult).toHaveLength(1);
      expect(firstPageResult[0].title).toBe(DEFAULT_ITEMS_ARRAY[0].title);

      const secondPageResult = ItemApi.pageItems(DEFAULT_ITEMS_ARRAY, 1, 1);
      expect(secondPageResult).toHaveLength(1);
      expect(secondPageResult[0].title).toBe(DEFAULT_ITEMS_ARRAY[1].title);
    });
  });
});
