import {
  gql
} from "@apollo/client";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GET_QUEUED_SONGS } from "./queries";

const client = new ApolloClient({
  link: new WebSocketLink({
    uri:'ws://adminmttt.ltd/v1/graphql',
    options:{
      reconnect:true,
    },
  }),
  cache: new InMemoryCache()
});



export default client;