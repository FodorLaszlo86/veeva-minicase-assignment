import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import Report from './containers/Report/Report';
import * as serviceWorker from './serviceWorker';
// polyfill for IE9+ browsers
import 'react-app-polyfill/ie9';

ReactDOM.render(<Report />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
