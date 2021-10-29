import React from 'react';
import ReactDom from 'react-dom';
import  './styles/index.scss';

import Button from './components/Button';

const App = () => (
    <div>
        <Button label="Hooooooola"></Button>
    </div>
);
ReactDom.render(<App />, document.getElementById('root') as HTMLElement);