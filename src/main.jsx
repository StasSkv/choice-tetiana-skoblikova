import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'modern-normalize';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import Modal from 'react-modal';
import { store } from './redux/store.js';

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);
