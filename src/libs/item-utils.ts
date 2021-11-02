import Item from '../interfaces/item';

class ItemUtils {
  /**
   * Returns the index of an item in the favourites array
   * @param itemTitle Item title
   * @param itemEmail Seller e-mail
   * @returns -1 if the item is not favourite. Otherwise, the index is returned
   */
  static isFavourite(itemTitle: string, itemEmail: string, favouriteItems:Array<Item>) {
    const existentItemIndex = favouriteItems.findIndex(
      (favouriteItem) => favouriteItem.title === itemTitle && favouriteItem.email === itemEmail,
    );

    return existentItemIndex;
  }
}

export default ItemUtils;
