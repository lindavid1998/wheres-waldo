import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store'

const firebaseConfig = {
  apiKey: "AIzaSyAmKNAcGlMGxQ4xw4zpDjjwae5Mplt99B0",
  authDomain: "where-s-waldo-e0bd4.firebaseapp.com",
  projectId: "where-s-waldo-e0bd4",
  storageBucket: "where-s-waldo-e0bd4.appspot.com",
  messagingSenderId: "284645946788",
  appId: "1:284645946788:web:ebcd30d58368e91a45bd31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
