import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/App';
// import 'typeface-roboto';
//     "typeface-roboto": "0.0.54" package.json

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'client:*');
}

ReactDOM.render(<App />, document.getElementById('app'));
