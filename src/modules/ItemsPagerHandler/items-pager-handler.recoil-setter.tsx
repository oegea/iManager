// Core dependencies
import React, { useEffect } from 'react';
import {
  useSetRecoilState,
} from 'recoil';

// Constants
import { LOADED_ITEMS_STATE, CURRENT_PAGE_STATE } from '../../constants/atoms';

// Components

// Interfaces

const ItemsPagerHandler = (props: {loadedItemsValue: number, currentPageValue: number}) => {
  const setCurrentPage = useSetRecoilState(CURRENT_PAGE_STATE);
  const setLoadedItems = useSetRecoilState(LOADED_ITEMS_STATE);

  useEffect(() => {
    const { loadedItemsValue, currentPageValue } = props;
    setLoadedItems(loadedItemsValue);
    setCurrentPage(currentPageValue);
  }, []);

  return (
    <div />
  );
};
export default ItemsPagerHandler;
