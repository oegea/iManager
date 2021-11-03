// Core dependencies
import React, { useEffect } from 'react';
import {
  useSetRecoilState,
} from 'recoil';

// Constants
import { FAVOURITES_DIALOG_SHOWING, FAVOURITE_ITEMS_STATE } from '../../constants/atoms';

// Components

// Interfaces
import Item from '../../interfaces/item';

const ModalHandlerRecoilSetter = (
  props: {showFavouritesModal: boolean, favouriteItems: Array<Item>},
) => {
  const setShowFavouritesModal = useSetRecoilState(FAVOURITES_DIALOG_SHOWING);
  const setFavouriteItems = useSetRecoilState<Array<Item>>(FAVOURITE_ITEMS_STATE);

  useEffect(() => {
    const { showFavouritesModal, favouriteItems } = props;
    setShowFavouritesModal(showFavouritesModal);
    setFavouriteItems(favouriteItems);
  }, []);

  return (
    <div />
  );
};
export default ModalHandlerRecoilSetter;
