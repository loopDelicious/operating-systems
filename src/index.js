import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import App from './compnents/App';
import registerServiceWorker from './compnents/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
