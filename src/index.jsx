// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { debug, nodeEnv } from 'config';
import { isMobile } from 'utilities';
import * as serviceWorker from './serviceWorker';

// DEBUG ENTRY POINT
if (nodeEnv !== 'production') {
  localStorage.setItem('debug', `${debug}`);
}

ReactDOM.render(<App />, document.getElementById('app'));


serviceWorker.unregister();
