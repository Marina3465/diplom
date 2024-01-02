import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Log from './Log';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Log />
  </React.StrictMode>
);

reportWebVitals();
