import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './store';
import { Routes } from './Routes';
import { Links } from './components';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Links />
        <h1>Create Async Thunk Adapter Demo</h1>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
