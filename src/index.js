import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import App from './components/App.js';
import Dendrogram from './components/dendrogram.js';
import Circle from './components/circles.js';
import JsonTree from './components/JSONtree.js';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Dendrogram />, document.getElementById('dendro'));
ReactDOM.render(<Circle />, document.getElementById('circles'));
ReactDOM.render(<JsonTree />, document.getElementById('jTree'));

registerServiceWorker();

