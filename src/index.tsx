import React from 'react';
import ReactDom from 'react-dom';
import {
  RecoilRoot,
} from 'recoil';

import AppHandler from './components/AppHandler';

// Styles
import './styles/index.scss';

const App = () => (
  <div>
    <RecoilRoot>
      <AppHandler />
    </RecoilRoot>
  </div>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
