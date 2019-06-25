// import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/App';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'src:*');
}

ReactDOM.render(<App />, document.getElementById('app'));



ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
