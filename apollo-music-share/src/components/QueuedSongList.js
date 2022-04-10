import { Avatar, IconButton, Typography,makeStyles,useMediaQuery } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

function QueuedSongList( {queue} ){
    console.log("QueuedSongList",queue)
    const greaterThanMd=useMediaQuery(theme=>theme.breakpoints.up('md'));


    const song = {
        title:"Potter Payper - Daily Duppy | GRM Daily",
        artist:"GRM Daily",
        thumbnail:"https://i.ytimg.com/vi/vWWiF_Iq0nE/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVyjRAOT0x_87s-rJurQ8J-bJf3Q"
    }

    return greaterThanMd&&(<div style={{margin:'10px 0'}}>
        <Typography color="secondary" variant="button">
            Queue(5)
        </Typography>
        {Array.from({length:5},()=>song).map((song,i)=>(
            <QueuedSong key={i} song={song}/>
        ))}
    </div>)
} 

const useStyles = makeStyles(theme=>({
    avatar:{
        width:44,
        height:44
    },
    text:{
        textOverflow:'ellipsis',
        overflow:'hidden'
    },
    container:{
        display:'grid',
        gridAutoFlow:'column',
        gridTemplateColumns:'50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop:10
    },
    songInfoContainer:{
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
}));

function QueuedSong( { song } ){
    const classes = useStyles();
    const { thumbnail, artist,title } = song;
    return (
        <div className={classes.container}>
            <Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar}></Avatar>
            <div className={classes.songInfoContainer}>
                <Typography variant="subtitle2" className={classes.text}>
                    {title}
                </Typography>
                <Typography color="secondary" variant="body2" className={classes.text}>  
                    {title}
                </Typography>
            </div>
            <IconButton>
                <Delete color="error"/>
            </IconButton>
        </div>
    )
}


export default QueuedSongList;