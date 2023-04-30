import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import State from './Context/State'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <State >
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </State>
  </React.StrictMode>
);

reportWebVitals();
