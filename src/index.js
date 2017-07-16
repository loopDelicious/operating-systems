import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './javascripts/App';
import registerServiceWorker from './javascripts/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
