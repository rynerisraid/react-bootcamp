

export const sendActionAddSongToQueue=(song)=>{
    return {
        type:"ADD_QUEUED_SONG",
        payload:{
            song:song,
            log:"发送了一个Action"
        }
    }
}