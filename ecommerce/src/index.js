import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes , BrowserRouter as Router,  } from 'react-router-dom'
import Login from './components/login';
import Cart from './components/cart';
import LoginForm from './components/loginForm';
import { Provider } from 'react-redux';
import store from './components/store';
import { persistor } from './components/store';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Address from './components/address';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login_form' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/address' element={<Address />} />
      </Routes>
    </Router>
  </React.StrictMode>
  </PersistGate>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
