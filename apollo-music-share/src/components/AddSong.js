import React from "react";
import { Dialog,
        DialogTitle, 
        InputAdornment, 
        TextField,
        DialogContent, 
        DialogActions,
        makeStyles 
    } from '@material-ui/core';
import { Button} from '@material-ui/core';
import { Link,AddBoxOutlined, ContactSupportOutlined } from '@material-ui/icons';
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube"
import { useMutation } from "@apollo/client";
import { ADD_SONG } from './../graphql/mutation';

const useStyles = makeStyles(theme=>({
    container:{
        display:'flex',
        alignItems:'center'
    },
    urlInput:{
        margin: theme.spacing(1)
    },
    addSongButton:{
        margin: theme.spacing(1)
    },
    dialog:{
        textAlign: 'center',
    },
    thumbnail:{
        width: '90%'
    }
}));

const DEFAULT_SONG = {
    duration:0,
    title:"",
    artist:"",
    thumbnail:""
}

function AddSong(){
    const classes = useStyles();
    const [addSong, {error} ]=useMutation(ADD_SONG);
    const [url, setUrl] = React.useState('');
    const [dialog, setDialog]=React.useState(false);
    const [playable,setPlayable] = React.useState(false);
    const [song,setSong] = React.useState(DEFAULT_SONG);
    React.useEffect(()=>{
        const isPlayable = SoundcloudPlayer.canPlay(url)|| YoutubePlayer.canPlay(url);
        setPlayable(isPlayable);
    },[url])

    function handleCloseDialog(){
        setDialog(false);
    }

    async function handleEditSong( { player }){
        const nestedPlayer = player.player.player;
        let songData;
        if(nestedPlayer.getVideoData){
            songData = getYoutubeInfo(nestedPlayer);
        }else if(nestedPlayer.getCurrentSound){
            songData = await getSoundCloudInfo(nestedPlayer)
        }

        setSong({...songData,url});

    }

    function getSoundCloudInfo(player){
        return new Promise(resolve=>{
            player.getCurrentSound(songData=>{
                console.log(songData);
                if(songData){
                    resolve( {
                        duration: Number(songData.duration/1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail:songData.artwork_url.replace('-large','-t500x500')
                    })
                }
            })

        });
        

    }

    function getYoutubeInfo(player){
        const duration =  player.getDuration();
        const {title, video_id, author} = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
        console.log(player.getVideoData());
        return {
            duration,
            title:title,
            artist: author,
            thumbnail
        }
    }

    function handleChangeSong(event){
        const { name, value} = event.target;
        //console.log({ name, value})
        setSong(prevSong=>({
            ...prevSong,
            [name]:value
        }));
    }

    async function handleAddSong(){
        //console.log(song);
        //addSong({variables:{...song}});
        try {
            const { url, thumbnail, duration, title, artist} = song
            await addSong({
                variables:{
                    url: url.length>0?url:null,
                    thumbnail:thumbnail.length>0?thumbnail:null,
                    duration:duration>0?duration:null,
                    title:title.length>0?title:null,
                    artist:artist.length>0?artist:null
                }
            })
            handleCloseDialog()
            setSong(DEFAULT_SONG)
            setUrl('')
        } catch (error) {
            console.error("Error add song",error);
        }

    }

    function handleError(field){
        return error && error.graphQLErrors[0].extensions.path.includes(field);
    }

    const { thumbnail, title, artist }  = song;
    console.dir(error);
    return (
        <div className={classes.container}>
            <Dialog
                className={classes.dialog}
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img src={thumbnail}
                    alt="Song thumbnail"
                    className={classes.thumbnail}
                    style={{width:450,height:450}}
                    />

                    
                    <TextField
                        value={title}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="title"
                        label = "Title"
                        fullWidth
                        error = {handleError('title')}
                        helperText={handleError('title')&&'Fill out field'}
                    />
                    <TextField
                        value={artist}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="artist"
                        label = "Artist"
                        fullWidth
                        error = {handleError('artist')}
                        helperText={handleError('artist')&&'Fill out field'}
                    />
                    <TextField
                        value={thumbnail}
                        onChange={handleChangeSong}
                        margin="dense"
                        name="thumbnail"
                        label = "Thumbnail"
                        fullWidth
                        error = {handleError('thumbnail')}
                        helperText={handleError('thumbnail')&&'Fill out field'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleAddSong} variant="outlined" color="primary">Add Song</Button>
                </DialogActions>
            </Dialog>
            
            <TextField
                className={classes.urlInput}
                onChange={event => setUrl(event.target.value)}
                value = {url}
                placeholder="Add Youtube or Soundcloud url"
                fullWidth
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment:(
                        <InputAdornment position="start">
                            <Link/>
                        </InputAdornment>
                    )
                }}
            />

            <Button
                disabled={!playable}
                className={classes.addSongButton}
                onClick={()=>{setDialog(true)}}
                variant="contained"
                color="primary"
                endIcon={<AddBoxOutlined/>}
            >Add</Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong}/>
        </div>
    )
}

export default AddSong;