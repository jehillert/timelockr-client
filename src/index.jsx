// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/App';
import { nodeEnv } from 'config';
import * as serviceWorker from './serviceWorker';

if (nodeEnv !== 'production') {
  localStorage.setItem('debug', 'src:*');
}

ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();
