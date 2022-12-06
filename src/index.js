import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import GateOptions from './components/Gate_options';
import GateSpace from './components/Gate_space';
import TopNav from './components/Top_nav';
import { GTYPE } from './Constants';

const root = ReactDOM.createRoot(document.getElementById('root'));
var elems = [];
for(let i in GTYPE)elems.push(GTYPE[i]);
root.render(
  <React.StrictMode>
    <TopNav>
      <div className='bacgrnd' />
      <GateSpace cssvar={document.querySelector(':root').style}>
        <GateOptions side="right" elems={elems}/>
      </GateSpace>
    </TopNav>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
