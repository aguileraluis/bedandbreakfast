import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
)

reportWebVitals();
