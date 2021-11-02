// Core dependencies
import React from 'react';
import {
  useRecoilValue,
  useRecoilState,
} from 'recoil';

// Constants
import { LOADED_ITEMS_STATE, CURRENT_PAGE_STATE } from '../../constants/atoms';

// Components
import ItemsPager from '../ItemsPager';

// Interfaces

const ItemsPagerHandler = () => {
  const loadedItems = useRecoilValue(LOADED_ITEMS_STATE);
  const [currentPage, setCurrentPage] = useRecoilState(CURRENT_PAGE_STATE);

  let itemsPagerTitle = 'Keep discovering more incredible items';
  let showButton = true;

  if (loadedItems === 0) {
    itemsPagerTitle = "There weren't more items ='(";
    showButton = false;
  }
  return (
    <ItemsPager title={itemsPagerTitle} showButton={showButton} buttonLabel="Load more items" onButtonClick={() => { setCurrentPage(currentPage + 1); }} />
  );
};
export default ItemsPagerHandler;
