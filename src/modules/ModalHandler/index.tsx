// Core dependencies
import React, { useState } from 'react';
import {
  useRecoilState,
} from 'recoil';

// Components
import Modal from '../../components/Modal';
import ItemCard from '../../components/ItemCard';
import SearchBar from '../../components/SearchBar';

// Constants
import { FAVOURITES_DIALOG_SHOWING, FAVOURITE_ITEMS_STATE } from '../../constants/atoms';

// Interfaces
import Item from '../../interfaces/item';

// Libs
import ItemUtils from '../../libs/item-utils';

/**
 * Modal with favourite items
 * @param props Properties
 * @returns React component
 */
const ModalHandler = () => {
  const [showFavouritesModal, setShowFavouritesModal] = useRecoilState(FAVOURITES_DIALOG_SHOWING);
  const [favouriteItems, setFavouriteItems] = useRecoilState<Array<Item>>(FAVOURITE_ITEMS_STATE);
  const [search, setSearch] = useState('');

  /**
   * Removes an item from the favourites list
   * @param item Item to be removed
   */
  const removeFavourite = (item: Item) => {
    const index = ItemUtils.isFavourite(item.title, item.email, favouriteItems);
    const newFavouriteItems = [...favouriteItems];
    newFavouriteItems.splice(index, 1);
    setFavouriteItems(newFavouriteItems);
  };

  /**
   * Executed when filtering by title is requested
   * @param text Text to filter by
   */
  const onSearch = (text: string) => {
    setSearch(text);
  };

  let filteredFavouriteItems = favouriteItems;
  if (search.length > 0) {
    filteredFavouriteItems = favouriteItems.filter((item) => {
      const lowerFilter = search.toLowerCase();
      const lowerItemTitle = item.title.toLowerCase();

      return (
        lowerItemTitle.indexOf(lowerFilter) !== -1
      );
    });
  }

  return (
    <>
      {showFavouritesModal && (
      <Modal
        onClose={() => { setShowFavouritesModal(false); }}
      >
        <SearchBar onSearch={onSearch} />
        {filteredFavouriteItems.length < 1 && <div className="no-favourite-items">You have no favourite items</div>}
        <div className="favourite-items">
          {filteredFavouriteItems.map((item) => (
            <ItemCard
              key={`${item.title}-${item.email}`}
              title={item.title}
              image={item.image}
              buttonLabel="Remove from favourites"
              onButtonClick={() => { removeFavourite(item); }}
            />
          ))}
        </div>
      </Modal>
      )}
    </>
  );
};
export default ModalHandler;
