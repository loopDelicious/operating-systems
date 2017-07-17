import React from 'react';
import ReactDOM from 'react-dom';
import Circle from './circles';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Circle />, div);
});
