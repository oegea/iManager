// Core dependencies
import React from 'react';
import {
  atom,
  useRecoilState,
} from 'recoil';

// Constants
import { FAVOURITE_ITEMS } from '../../constants/atoms';

// Components
import ItemCard from '../ItemCard';

// Interfaces
import Item from '../../interfaces/item';

// Initialize Recoil
const favouriteItemsState = atom(FAVOURITE_ITEMS);

/**
 * Prints a sellable item with the needed logic to add it to favourites
 * @param props Required props
 * @returns React component
 */
const ItemCardHandler = (props: Item) => {
  // Constants
  const ALREADY_EXISTS_INDEX = -1;

  const {
    title, description, price, email, image,
  } = props;

  const [favouriteItems, setFavouriteItems] = useRecoilState<Item[]>(favouriteItemsState);

  // Functions

  /**
   * Returns the index of an item in the favourites array
   * @param itemTitle Item title
   * @param itemEmail Seller e-mail
   * @returns -1 if the item is not favourite. Otherwise, the index is returned
   */
  const isFavourite = (itemTitle: string, itemEmail: string):number => {
    const existentItemIndex = favouriteItems.findIndex(
      (favouriteItem) => favouriteItem.title === itemTitle && favouriteItem.email === itemEmail,
    );

    return existentItemIndex;
  };

  /**
   * Removes an item from the favourites array
   * @param index Position of the item to remove
   */
  const removeFromFavourites = (index:number) => {
    const newFavouriteItems = [...favouriteItems];
    newFavouriteItems.splice(index, 1);
    setFavouriteItems(newFavouriteItems);
  };

  /**
   * Adds the current item to favourites
   */
  const addToFavourites = () => {
    const newFavouriteItems = [...favouriteItems, props];
    setFavouriteItems(newFavouriteItems);
  };

  /**
   * Event executed when the item button is clicked
   */
  const onClick = () => {
    const index = isFavourite(title, email);
    // Item already exists
    if (index !== ALREADY_EXISTS_INDEX) {
      removeFromFavourites(index);
      return;
    }

    addToFavourites();
  };

  // Render
  return (
    <ItemCard
      title={title}
      description={description}
      price={price}
      email={email}
      image={image}
      buttonLabel={isFavourite(title, email) === -1 ? 'Add to favourites' : 'Remove from favourites'}
      onButtonClick={onClick}
    />
  );
};

const defaultProps: Item = {
  title: '',
  description: '',
  price: '',
  email: '',
  image: '',
};

ItemCardHandler.defaultProps = defaultProps;

export default ItemCardHandler;
