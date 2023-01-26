import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DrinksProvider from './context/DrinksProvider';
import FoodProvider from './context/FoodProvider';

import * as serviceWorker from './serviceWorker';
import './styles/index.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <DrinksProvider>
        <FoodProvider>
          <App />
        </FoodProvider>
      </DrinksProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
