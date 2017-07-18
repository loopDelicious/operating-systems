import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import Circle from './components/circles.js';
import Tree from './components/tree.js';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(<Circle />, document.getElementById('root'));
ReactDOM.render(<Tree />, document.getElementById('JSONTree'));

registerServiceWorker();

