import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './store/store'
import { Provider } from 'mobx-react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);