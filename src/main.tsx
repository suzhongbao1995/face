import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './dva';
import App from './App';

import '@assets/reset.css';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(app);
}
