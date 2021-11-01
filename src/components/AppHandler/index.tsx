// Core dependencies
import React, { useState, useEffect } from 'react';

// Interfaces
import Item from '../../interfaces/item';

// App components
import Toolbar from '../Toolbar';
import ItemsGrid from '../ItemsGrid';
import ItemsPager from '../ItemsPager';

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

  const onSearch = (text: string) => {
    setItems([]);
    setItemsLoaded(1);
    setPage(0);
    setSearchText(text);
    setIsLoading(true);
  };

  const onSortBy = (field: string) => {
    setItems([]);
    setItemsLoaded(1);
    setPage(0);
    setSortBy(field);
    setIsLoading(true);
  };

  let itemsPagerTitle = 'Keep discovering more incredible items';
  let showButton = true;

  if (itemsLoaded === 0) {
    itemsPagerTitle = "There weren't more items ='(";
    showButton = false;
  }

  return (
    <>
      <Toolbar label="iManager" onFavouritesClick={() => { alert('Opening favourites'); }} onSearch={onSearch} onSortBy={onSortBy} />
      <div className="body-wrapper">
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ItemsGrid items={items} />}
      </div>
      <ItemsPager title={itemsPagerTitle} showButton={showButton} buttonLabel="Load more items" onButtonClick={() => { setPage(currentPage + 1); }} />
    </>
  );
};

export default AppHandler;
