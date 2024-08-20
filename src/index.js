import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import DashboardComponent from './features/dashboard/DashboardComponent';
import './index.css'; // Assuming you want to keep your CSS styles

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DashboardComponent />
    </Provider>
  </React.StrictMode>
);

export default root;
