import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid,useMediaQuery,Hidden } from "@material-ui/core";
import { songReducer,queSongReducer }from "./reducer";

// export const SongContext = React.createContext({
//     song:{
//       duration: 405,
//       artist: "曲肖冰",
//       thumbnail: "http://img.youtube.com/vi/D1JRQmo6hcc/0.jpg",
//       title: "静悄悄 (DjKaNSas ElectroMelbourne Mix)",
//       url: "https://www.youtube.com/watch?v=D1JRQmo6hcc",
//       create_at: "2022-04-07T22:59:16.512231+00:00",
//       id: "9dabe37d-48cb-4ec7-9469-7927741bc729"
//     },
//     isPlaying: false
//   }
// );

// export const QueueSongContext = React.createContext({
//   queue:[]
// });

function App() {
  // const initialSongState = React.useContext(SongContext);
  // const [state,dispatch] = React.useReducer(songReducer,initialSongState);



  const greaterThanMd=useMediaQuery(theme=>theme.breakpoints.up('md'));
  const greaterThanSm=useMediaQuery(theme=>theme.breakpoints.up('sm'));
  return (
    // <SongContext.Provider value={{ state,dispatch}}>
    <>
      <Hidden only="xs">
        <Header/>
      </Hidden>
      
      <Grid  container spacing={3}>
        <Grid item xs={12} md={7} style={{paddingTop:greaterThanSm?80:10,paddingLeft:80}}>
          <AddSong/>
          <SongList/>
        </Grid>

        <Grid item xs={12} md={5} style={
          greaterThanMd?
            {position:'fixed',width:'100%',right:0,top:70}:
            {position:'fixed',width:'100%',left:0,bottom:0}
          }
          >
          <SongPlayer/>
        </Grid>

      </Grid>
    </>
    // </SongContext.Provider>  
    );
}

export default App;
