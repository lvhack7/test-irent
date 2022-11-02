import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux'
import { hydrate } from './store/reducers/UserSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const getUserState = () => {
  try {
    const persistedState = localStorage.getItem('state')
    return persistedState ? JSON.parse(persistedState) : null
  } catch (e) {
    console.log(e)
  }
}

const state = getUserState()
if (state) {
  store.dispatch(hydrate(state))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

