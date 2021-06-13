import { MuiThemeProvider } from '@material-ui/core/styles';
import { MUI_THEME, THEME } from 'assets/theme/setupTheme';
import store from 'configStore';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import LocaleProvider from 'utils/localeProvider/LocaleProvider';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <LocaleProvider>
        <ThemeProvider theme={THEME}>
          <MuiThemeProvider theme={MUI_THEME}>
            <SnackbarProvider maxSnack={3}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SnackbarProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </LocaleProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
