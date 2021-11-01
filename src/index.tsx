import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import {
  RecoilRoot,
} from 'recoil';

// Styles
import './styles/index.scss';

// Interfaces
import Item from './interfaces/item';

// App components
import Toolbar from './components/Toolbar';
import ItemsGrid from './components/ItemsGrid';
import ItemsPager from './components/ItemsPager';

// Libs
import AxiosClient from './libs/axios-client';

// Apis
import ItemApi from './api/item-api';

const App = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setPage] = useState<number>(0);

  useEffect(() => {
    const itemApi = new ItemApi(new AxiosClient());
    itemApi.search(searchText, sortBy, 5, currentPage)
      .then((itemsResult) => {
        setItems([...items, ...itemsResult]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [searchText, sortBy, currentPage]);

  const onSearch = (text: string) => {
    setSearchText(text);
    setIsLoading(true);
  };

  const onSortBy = (field: string) => {
    setSortBy(field);
    setIsLoading(true);
  };

  return (
    <div>
      <RecoilRoot>
        <Toolbar label="iManager" onFavouritesClick={() => { alert('Opening favourites'); }} onSearch={onSearch} onSortBy={onSortBy} />
        <div className="body-wrapper">
          {isLoading && <p>Loading...</p>}
          {!isLoading && <ItemsGrid items={items} />}
        </div>
        <ItemsPager title="Keep discovering more incredible items" showButton buttonLabel="Load more items" onButtonClick={() => { setPage(currentPage + 1); }} />
      </RecoilRoot>
    </div>
  );
};
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
