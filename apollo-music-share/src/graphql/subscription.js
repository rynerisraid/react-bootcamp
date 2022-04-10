import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    createHttpLink,
    gql
  } from "@apollo/client";

export const GET_SONGS = gql`
    subscription getSongs {
        songs(order_by:{create_at:desc}) {
        artist
        duration
        id
        thumbnail
        title
        url
        }
    }
`