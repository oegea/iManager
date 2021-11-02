// Core dependencies
import React, { useState, useEffect } from 'react';
import {
  atom,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';

// Interfaces
import Item from '../../interfaces/item';

// App components
import Toolbar from '../Toolbar';
import ItemsGrid from '../ItemsGrid';
import ItemsPagerHandler from '../ItemsPagerHandler';
import Modal from '../Modal';

// Libs
import AxiosClient from '../../libs/axios-client';

// Constants
import { LOADED_ITEMS, CURRENT_PAGE } from '../../constants/atoms';

// Apis
import ItemApi from '../../api/item-api';

// Initialize Recoil
const loadedItemsState = atom(LOADED_ITEMS);
const currentPageState = atom(CURRENT_PAGE);

const AppHandler = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [showFavouritesModal, setShowFavouritesModal] = useState<boolean>(false);

  // Recoil
  const setLoadedItems = useSetRecoilState(loadedItemsState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    const itemApi = new ItemApi(new AxiosClient());
    itemApi.search(searchText, sortBy, 5, currentPage)
      .then((itemsResult) => {
        setLoadedItems(itemsResult.length);
        setItems([...items, ...itemsResult]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [searchText, sortBy, currentPage]);

  const resetSearch = () => {
    setItems([]);
    setLoadedItems(1);
    setCurrentPage(0);
    setIsLoading(true);
  };

  const onSearch = (text: string) => {
    resetSearch();
    setSearchText(text);
  };

  const onSortBy = (field: string) => {
    resetSearch();
    setSortBy(field);
  };

  return (
    <>
      <Toolbar label="iManager" onFavouritesClick={() => { setShowFavouritesModal(true); }} onSearch={onSearch} onSortBy={onSortBy} />
      <div className="body-wrapper">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ItemsGrid items={items} />}
      </div>
      <ItemsPagerHandler />
      {showFavouritesModal && (
      <Modal
        onClose={() => { setShowFavouritesModal(false); }}
      >
        Hola
      </Modal>
      )}
    </>
  );
};

export default AppHandler;
