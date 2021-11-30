import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';
import { AppProvider } from './src/context/AppContext.js';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
