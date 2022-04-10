import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql
} from "@apollo/client";



const client = new ApolloClient({
  uri: 'https://todos-holy-bedbug-22.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token'),
    'content-type':'application/json',
    'x-hasura-admin-secret': `qmt5wWVPi6jx7pCFqLxa67teT0TvmkA5KOjCKj0Nst0RONg0OU203TJsDg0QUcUq`
  }
});


client.query({
  query:gql`
    query getTodos{
      todos {
        done
        id
        text
      }
    }
  `
}).then((data)=>{console.log(data)})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

