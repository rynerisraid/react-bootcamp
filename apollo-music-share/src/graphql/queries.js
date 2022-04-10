import { gql} from "apollo-boost";
import client from './client';
  

export const GET_SONGS = gql`
    query getSongs {
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

export const GET_QUEUED_SONGS = gql`
    query getQueuedSongs{
        queue @client{
        id
        duration
        title
        artist
        thumbnail
        url
        }
    }
`


  