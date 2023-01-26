import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import DrinksProvider from './context/DrinksProvider';
import FoodProvider from './context/FoodProvider';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineProviders } from './helpers';

const Providers = combineProviders(DrinksProvider, FoodProvider);

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
