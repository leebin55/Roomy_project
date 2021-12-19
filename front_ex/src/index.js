import React from 'react';
import { render } from 'react-dom';
import {CookiesProvider} from 'react-cookie'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// CookiesProvider로 감쌋음 cookie를 전체에 쓰려고 
render(
	<CookiesProvider>
		<App />
	</CookiesProvider>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
