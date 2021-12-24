import { render } from 'react-dom';
import React from 'react';
import App from './App';
import 'antd/dist/antd.css';
import { GlobalStyles } from './styles/GlobalStyles';
import { ContextProvider } from './context/context';

render(
  <ContextProvider>
    <GlobalStyles />
    <App />
  </ContextProvider>,
  document.getElementById('root')
);