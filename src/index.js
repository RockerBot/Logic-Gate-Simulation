import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import GateOptions from './components/Gate_options';

const root = ReactDOM.createRoot(document.getElementById('root'));
var elems = ["NOT", "AND", "OR", "XOR"];
root.render(
  <React.StrictMode>
    <div className='bacgrnd' />
    {/* <App/> */}
    <GateOptions side="right" elems={elems}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
