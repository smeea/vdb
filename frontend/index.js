import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'App.js';
import { AppProvider } from 'context';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
