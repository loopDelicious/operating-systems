import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import Circle from './components/circles';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(<Circle />, document.getElementById('root'));
registerServiceWorker();
