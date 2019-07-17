// import '@babel/polyfill';
import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { nodeEnv } from 'config';
import * as serviceWorker from './serviceWorker';

if (nodeEnv !== 'production') {
  localStorage.setItem('debug', '-*');
}

// const root = document.createElement('div');
// document.body.appendChild(root);

// render(root);

ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();
