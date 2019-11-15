import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { ApolloLink } from 'apollo-client-preset'
import App from './app/index'

const GRAPHCMS_API = 'https://hilton-server.herokuapp.com/graphql'

const httpLink = new HttpLink({
  uri: GRAPHCMS_API,
})

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = ''

  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareAuthLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
