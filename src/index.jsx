// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from 'components';
import { debug, nodeEnv } from 'config';
import * as serviceWorker from './serviceWorker';
import store from './store';

// DEBUG ENTRY POINT
if (nodeEnv !== 'production') {
  localStorage.setItem('debug', `${debug}`);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

serviceWorker.unregister();
