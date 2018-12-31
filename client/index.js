
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { hydrate, render } from 'react-dom';
import App from './src/app.js'
import clientStore from './store';
const initialState = window.__INITIAL_STATE;
const store = createStore(clientStore, initialState);
hydrate(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))