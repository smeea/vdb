import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from 'App.js';
import { AppProvider } from 'context';

ReactDOM.render(
  <Suspense fallback={<div />}>
    <AppProvider>
      <App />
    </AppProvider>
  </Suspense>,

  document.getElementById('root')
);
