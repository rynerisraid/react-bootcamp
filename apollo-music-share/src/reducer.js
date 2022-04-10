const songInitial = {
    song:{
        duration: 405,
        artist: "曲肖冰",
        thumbnail: "http://img.youtube.com/vi/D1JRQmo6hcc/0.jpg",
        title: "静悄悄 (DjKaNSas ElectroMelbourne Mix)",
        url: "https://www.youtube.com/watch?v=D1JRQmo6hcc",
        create_at: "2022-04-07T22:59:16.512231+00:00",
        id: "9dabe37d-48cb-4ec7-9469-7927741bc729"
      },
      isPlaying: false
}

export const songReducer=(state=songInitial,action)=>{
    switch (action.type) {
        case "PLAY_SONG":
            return {
                ...state,
                isPlaying:true
            };
        case "PAUSE_SONG":
            return {
                ...state,
                isPlaying:false
            };

        case "SET_SONG":
            return {
                ...state,
                song:action.payload.song
            }
        default:
            return state;
    }

}



export const queSongReducer = (state={queue:[]},action)=>{
    switch(action.type){
        case "ADD_QUEUE_SONG":
            return {

            };
        case "REMOVE_QUEUE_SONG":
            return {

            };
        default:
            return state;
    }
}
