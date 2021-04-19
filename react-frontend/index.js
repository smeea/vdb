import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext.js';
import { AppProvider } from './context/AppContext.js';

ReactDOM.render(
  <AppProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AppProvider>,
  document.getElementById('root')
);
