import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { authStore } from './Redux/AuthSlice';
import { Provider } from 'react-redux';
import axios from 'axios';
import { request } from 'http';

function interceptors(){
  axios.interceptors.request.use(request => {
    if(authStore.getState().auth.token.length > 0)
        request.headers["Authorization"] = "Bearer " + authStore.getState().auth.token;
    return request;
  
  })
}

interceptors(); // run this function to make axios send token on each request


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    
  // /* </React.StrictMode> */
 
    <Layout />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
