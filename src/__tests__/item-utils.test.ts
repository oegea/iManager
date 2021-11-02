import ItemUtils from '../libs/item-utils';
import DEFAULT_ITEMS from '../__mocks__/default-items-array';

describe('ItemUtils', () => {
  it('should return -1 if an item does not exist', () => {
    expect(ItemUtils.isFavourite('notexistent', 'notexists@item.com', DEFAULT_ITEMS)).toBe(-1);
  });

  it('should not return -1 if the item exists', () => {
    expect(ItemUtils.isFavourite('iPhone 11', 'iphonemail@wallapop.com', DEFAULT_ITEMS)).toBe(0);
  });
});
