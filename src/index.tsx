import React from 'react';
import ReactDom from 'react-dom';

// Styles
import './styles/index.scss';

// App components
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import Toolbar from './components/Toolbar';

const App = () => (
  <div>
    <Toolbar label="iManager" onFavouritesClick={() => { alert('Opening favourites'); }} onSearch={() => { alert('Searching'); }} />
  </div>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
