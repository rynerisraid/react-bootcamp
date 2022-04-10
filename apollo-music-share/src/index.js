import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CssBaseline, MuiThemeProvider} from '@material-ui/core'
import theme from "./theme";
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';
import { Provider} from 'react-redux';
import {store} from './store';

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <App />
          </CssBaseline>
        </MuiThemeProvider>
    </ApolloProvider>
  </Provider>
,
  document.getElementById('root')
);
