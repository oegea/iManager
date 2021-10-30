import React from 'react';
import ReactDom from 'react-dom';

// Styles
import './styles/index.scss';

// App components
import Button from './components/Button';
import SearchBar from './components/SearchBar';

const App = () => (
  <div>
    <Button>Hola</Button>
    <SearchBar />
  </div>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
