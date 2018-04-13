import React from 'react';
import {AsyncStorage} from 'react-native';
import TodoApp from './TodoApp';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {clusterName} from '../Hasura';

const graphqlUrl = `https://data.${clusterName}.hasura-app.io/v1alpha1/graphql`
const httpLink = new HttpLink({ uri: graphqlUrl });

// adding auth headers
const authMiddleware = new ApolloLink((operation, forward) => {
  fetchSession().then((session) => {
    operation.setContext({
      headers: {
        authorization: session ? "Bearer " + session.token : null
      }
    });
  })
  return forward(operation);
});


// Creating a client instance
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
});

// Helper function to fetch token from local storage
const fetchSession = async () => {
  try {
    const sessionString = await AsyncStorage.getItem(`@${clusterName}:myapp`);
    const sessionObj = await JSON.parse(sessionString);
    return sessionObj;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default class AppScreen extends React.Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <TodoApp
          client={client}
          session={this.props.sessionInfo}
          logoutCallback={this.props.logoutCallback}
        />
      </ApolloProvider>
    )
  }
}
