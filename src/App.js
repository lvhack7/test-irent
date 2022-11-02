import React, { useEffect } from 'react';
import {
  Router
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import history from "./utils/history";
import { checkAuth } from './store/actions/userActions'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from './components/Footer';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth())
    }
  }, [])
  return (
    <div>
      <Router history={history}>
        <Header />
        <AppRouter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
