import { useQuery, useSubscription,useMutation } from "@apollo/client";
import { CardContent,
        CardMedia,
        Card,
        CircularProgress,
        IconButton, 
        Typography,
        CardActions,
        makeStyles
    } from "@material-ui/core";
import { PlayArrow,Save,Pause } from "@material-ui/icons";
import React from "react";
import theme from './../theme';
import { GET_SONGS } from './../graphql/subscription';
import { SongContext } from './../App';
import { store } from "../store";
import {sendActionAddSongToQueue} from '../action'



function SongList(){

    const {data, loading, error} = useSubscription(GET_SONGS);
    

    if(loading){
        return (
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                marginTop: 50
            }}>
                <CircularProgress/>
            </div>
        )
    }

    if(error) return <div>Error fetcting songs</div>;

    return <div>
        {data.songs.map((song,i)=>(
            <Song key={i} song={song}/>
        ))}
    </div>
}

const useStyles = makeStyles(theme=>({
    container:{
        margin: theme.spacing(3)
    },
    songInfoContainer:{
        display: 'flex',
        alignItems: 'center'
    },
    songInfo:{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail:{
        objectFit:'cover',
        width:140,
        height:140
    }
}));

function Song({ song }){
    const { id } = song;
    const { title,artist,thumbnail } = song;
    const { state,dispatch }=store.getState();//=React.useContext(SongContext);
    const classes = useStyles();
    const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);

    function handleTogglePlay(){
        dispatch({type:"SET_SONG",payload:{song}});
        dispatch(state.isPlaying?{type:"PAUSE_SONG"}:{type:"PLAY_SONG"});
    }

    React.useEffect(()=>{
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying);
    },[id,state.song.id,state.isPlaying]);
    
    function handleAddOrRemoveQueue(){
        //console.log("handleAddOrRemoveQueue",song)
        const action = sendActionAddSongToQueue({song});
        //发送一个action
        console.log(action)
        store.dispatch(action)
    }

    

    return <Card className={classes.songInfoContainer}>
        <div className={classes.songInfo}>
            <CardMedia className={classes.thumbnail} image={thumbnail}></CardMedia>
            <div className={classes.songInfo}>
                <CardContent>
                   <Typography gutterBottom variant="h5" component="h2">
                       {title}    
                   </Typography> 
                   <Typography gutterBottom variant="body1" component="p">
                       {artist}    
                   </Typography> 
                </CardContent>
                <CardActions>
                    <IconButton onClick={handleTogglePlay} size="small" color="primary">
                        {currentSongPlaying?<Pause/>:<PlayArrow/>}
                    </IconButton>
                    <IconButton size="small" color="secondary" onClick={handleAddOrRemoveQueue}>
                        <Save/>
                    </IconButton>
                </CardActions>
            </div>
        </div>
    </Card>
}

export default SongList;