import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Si deseas medir el rendimiento de tu aplicación, puedes pasar una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o enviar a un endpoint de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
