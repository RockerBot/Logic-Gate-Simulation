import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import GateOptions from './components/Gate_options';
import GateSpace from './components/Gate_space';
import TopNav from './components/Top_nav';
import Line from './components/Line';

const root = ReactDOM.createRoot(document.getElementById('root'));
var elems = ["AND", "NAND", "OR", "NOR", "XOR", "XNOR", "NOT", "BUFFER", "SRFF", "DFF", "JKFF", "TFF"];
// var global_info = {
//   "AND":{
//     in:2,
//     out:1,
//     calc: ()=>
//   }
// };
root.render(
  <React.StrictMode>
    <div className='bacgrnd' />
    <TopNav />
    <GateSpace>
      <GateOptions side="right" elems={elems}/>
      {/* <Line frm={{x:0, y:100}} to={{x:400, y:500}} on={true} dashes={false}/>
      <Line frm={{x:0, y:310}} to={{x:270, y:200}} on={false} dashes={false}/> */}
    </GateSpace>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
