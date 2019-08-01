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

// LOCK SCREEN ORIENTATION
if (isMobile) {
var current_mode = screen.orientation;

console.log(current_mode.type)
console.log(current_mode.angle)

screen.orientation.lock("portrait")
  .then(function() {
    alert('Locked');
  })
  .catch(function(error) {
    alert(error);
  });
}

ReactDOM.render(<App />, document.getElementById('app'));

serviceWorker.unregister();
