// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { debug, nodeEnv } from 'config';
import * as serviceWorker from './serviceWorker';

if (nodeEnv !== 'production') {
  localStorage.setItem('debug', `${debug}`);
}

ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();
