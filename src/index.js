import './wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';
// Firebse context wrapped around the App comp cause the whole app needs access to stored data (Login, Signup, Profile)

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
