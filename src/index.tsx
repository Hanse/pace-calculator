import '@devmoods/ui/dist/global.css';
import '@devmoods/ui/dist/styles.css';

import './index.css';

import { ThemeProvider, createTheme } from '@devmoods/ui';
import * as React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const theme = createTheme({
  colors: {
    primary: '#d75648',
    focusRing: '#7EB1F6',
    formsBorderRadius: '6px',
    formsBorderWidth: '1px',
    formsBorder: '#e4e4e4',
    formsBorderBackground: '#f1f2f3',
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
