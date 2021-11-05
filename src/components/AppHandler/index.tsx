// Core dependencies
import React, { useState, useEffect } from 'react';
import {
  useSetRecoilState,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// Interfaces
import Item from '../../interfaces/item';

// App components
import Toolbar from '../Toolbar';
import ItemsGrid from '../ItemsGrid';
import ItemsPagerHandler from '../ItemsPagerHandler';
import ModalHandler from '../ModalHandler';

// Libs
import AxiosClient from '../../libs/axios-client';

// Constants
import { LOADED_ITEMS_STATE, CURRENT_PAGE_STATE, FAVOURITES_DIALOG_SHOWING } from '../../constants/atoms';

// Apis
import ItemApi from '../../api/item-api';

const AppHandler = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Recoil
  const setLoadedItems = useSetRecoilState(LOADED_ITEMS_STATE);
  const [currentPage, setCurrentPage] = useRecoilState(CURRENT_PAGE_STATE);
  const setShowFavouritesModal = useSetRecoilState(FAVOURITES_DIALOG_SHOWING);

  useEffect(() => {
    const apiFetch = async () => {
      const itemApi = new ItemApi(new AxiosClient());
      try {
        const itemsResult = await itemApi.search(searchText, sortBy, 5, currentPage);
        setLoadedItems(itemsResult.length);
        setItems([...items, ...itemsResult]);
        setIsLoading(false);
      } catch {
        setError('Unhandled exception while recovering items');
        setItems([]);
        setIsLoading(false);
      }
    };

    apiFetch();
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
        {error.length > 0 && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ItemsGrid items={items} />}
      </div>
      <ItemsPagerHandler />
      <ModalHandler />
    </>
  );
};

export default AppHandler;
