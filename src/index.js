import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Choice from '../src/components/admin/Choice'
import Log from './components/auth/Log';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Choice />
  </React.StrictMode>
);

reportWebVitals();
