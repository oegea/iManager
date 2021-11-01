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

// Libs
import AxiosClient from './libs/axios-client';

// Apis
import ItemApi from './api/item-api';

const App = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    console.log('Side effect executed');
    const itemApi = new ItemApi(new AxiosClient());
    itemApi.search(searchText, '', 5, 1)
      .then((itemsResult) => {
        setItems(itemsResult);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [searchText]);

  const onSearch = (text: string) => {
    setSearchText(text);
    setIsLoading(true);
  };

  return (
    <div>
      <RecoilRoot>
        <Toolbar label="iManager" onFavouritesClick={() => { alert('Opening favourites'); }} onSearch={onSearch} />
        <div className="body-wrapper">
          {isLoading && <p>Loading...</p>}
          {!isLoading && <ItemsGrid items={items} />}
        </div>
      </RecoilRoot>
    </div>
  );
};
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
