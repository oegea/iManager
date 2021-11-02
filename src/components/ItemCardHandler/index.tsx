// Core dependencies
import React from 'react';
import {
  useRecoilState,
} from 'recoil';

// Constants
import { FAVOURITE_ITEMS_STATE } from '../../constants/atoms';

// Components
import ItemCard from '../ItemCard';

// Libs
import ItemUtils from '../../libs/item-utils';

// Interfaces
import Item from '../../interfaces/item';

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

  const [favouriteItems, setFavouriteItems] = useRecoilState<Item[]>(FAVOURITE_ITEMS_STATE);

  // Functions

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
    const index = ItemUtils.isFavourite(title, email, favouriteItems);
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
      buttonLabel={ItemUtils.isFavourite(title, email, favouriteItems) === -1 ? 'Add to favourites' : 'Remove from favourites'}
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
