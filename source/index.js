import React from 'react';
import { render } from "react-dom";
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux-store';

const customTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: {
      main: '#6237ae',
    },
  },
  shape: {
    borderRadius: 16,
  }
});


const container = document.getElementById('app');

render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>
  </Provider>,
  container,
);

