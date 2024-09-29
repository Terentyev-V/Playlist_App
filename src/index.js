import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary'


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/Playlist_App">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

