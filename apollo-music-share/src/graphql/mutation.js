import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    createHttpLink,
    gql
} from "@apollo/client";
  
import client from './client';


export const ADD_SONG=gql`
  mutation addSong($title: String!, $artist: String!, $thumbnail: String!,$duration: Float!,$url: String!) {
    insert_songs(objects: {artist: $artist, title: $title, thumbnail: $thumbnail, duration: $duration,url: $url}) {
      returning {
        id
        duration
        create_at
        artist
        thumbnail
        title
        url
      }
    }
  }
`;


export const ADD_OR_REMOVE_FROM_QUEUED=gql`
  mutation addOrRemoiveFromQueue($input: SongInput!) {
    addOrRemoiveFromQueue(input:$input) @client
  }
`;

