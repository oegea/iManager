// Core dependencies
import React, { useState, useEffect } from 'react';

// Interfaces
import Item from '../../interfaces/item';

// App components
import Toolbar from '../Toolbar';
import ItemsGrid from '../ItemsGrid';
import ItemsPager from '../ItemsPager';
import Modal from '../Modal';

// Libs
import AxiosClient from '../../libs/axios-client';

// Apis
import ItemApi from '../../api/item-api';

const AppHandler = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setPage] = useState<number>(0);
  // itemsLoaded is used to know if there were more items on the last loaded page
  const [itemsLoaded, setItemsLoaded] = useState<number>(0);
  const [showFavouritesModal, setShowFavouritesModal] = useState<boolean>(false);

  useEffect(() => {
    const itemApi = new ItemApi(new AxiosClient());
    itemApi.search(searchText, sortBy, 5, currentPage)
      .then((itemsResult) => {
        setItemsLoaded(itemsResult.length);
        setItems([...items, ...itemsResult]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [searchText, sortBy, currentPage]);

  const resetSearch = () => {
    setItems([]);
    setItemsLoaded(1);
    setPage(0);
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

  let itemsPagerTitle = 'Keep discovering more incredible items';
  let showButton = true;

  if (itemsLoaded === 0) {
    itemsPagerTitle = "There weren't more items ='(";
    showButton = false;
  }

  return (
    <>
      <Toolbar label="iManager" onFavouritesClick={() => { setShowFavouritesModal(true); }} onSearch={onSearch} onSortBy={onSortBy} />
      <div className="body-wrapper">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ItemsGrid items={items} />}
      </div>
      <ItemsPager title={itemsPagerTitle} showButton={showButton} buttonLabel="Load more items" onButtonClick={() => { setPage(currentPage + 1); }} />
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
