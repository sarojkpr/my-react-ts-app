// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import your App component

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
