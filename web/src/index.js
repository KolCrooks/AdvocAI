import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Simpletextarea from './textArea';
import Intro from './intro';
import Testimonial from './testimonial';

ReactDOM.render(
  <React.StrictMode>
    <Intro />
    {/* <Simpletextarea /> */}
    <Testimonial />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
