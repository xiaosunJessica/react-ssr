
import React from 'react';
import { observable, toJS } from 'mobx';

import { hydrate, render } from 'react-dom';
import { Provider } from 'mobx-react';
import App from './src/app.js'
import RootStore from './store';
const initialState = window.__INITIAL_STATE;
const store = new RootStore();
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))