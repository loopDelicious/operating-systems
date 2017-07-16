import React from 'react';
import ReactDOM from 'react-dom';

import './css/reset.css';
import './css/variables.css';
import './css/index.css';

import App from './components/App';
import registerServiceWorker from './components/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
