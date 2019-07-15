// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { App, AppWrapper } from 'components';
import { nodeEnv } from 'config';
import * as serviceWorker from './serviceWorker';

if (nodeEnv !== 'production') {
  localStorage.setItem('debug', '-*');
}

const HotApp = (
  <AppWrapper
    render={wrapper => (
      <App
        wrapper={wrapper}
      />
    )}
  />
);

ReactDOM.render(HotApp, document.getElementById('app'));


serviceWorker.unregister();
