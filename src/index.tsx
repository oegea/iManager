import React from 'react';
import ReactDom from 'react-dom';

// Styles
import './styles/index.scss';

// App components
import Toolbar from './components/Toolbar';
import ItemCard from './components/ItemCard';

const DEFAULT_TITLE = 'iPhone 11';
const DEFAULT_DESCRIPTION = 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.';
const DEFAULT_PRICE = '740';
const DEFAULT_EMAIL = 'iphonemail@wallapop.com';
const DEFAULT_IMAGE = 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png';
const DEFAULT_BUTTON_LABEL = 'Añadir a favoritos';

const App = () => (
  <div>
    <Toolbar label="iManager" onFavouritesClick={() => { alert('Opening favourites'); }} onSearch={() => { alert('Searching'); }} />
    <div className="body-wrapper">
      <ItemCard
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        price={DEFAULT_PRICE}
        email={DEFAULT_EMAIL}
        image={DEFAULT_IMAGE}
        buttonLabel={DEFAULT_BUTTON_LABEL}
        onButtonClick={() => { alert('Button clicked'); }}
      />
    </div>

  </div>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
