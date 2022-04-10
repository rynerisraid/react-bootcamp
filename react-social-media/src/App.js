import React from "react";
import Login from "./componments/Login";
import Header from "./componments/Header";
import CreatePost from "./componments/CreatePost";
import PostList from "./componments/PostList";
import postReducer from "./reducer";

   
export const UserContext = React.createContext();
export const PostContext = React.createContext({
    posts:[]
});

function App() {
    const initialPostState = React.useContext(PostContext);
    const [state,dispatch] = React.useReducer(postReducer,initialPostState);
    const [user,setUser] = React.useState('mttt');

    React.useEffect(()=>{
        document.title = user?`${user}'s Feed`:'Please Login';
    },[user]);

    if(!user){
        return <Login setUser={setUser}/>
    }else{
        return (
        <PostContext.Provider value={{state,dispatch}}>
        <UserContext.Provider value={user}>
            <Header user={user} setUser={setUser}/>
            <CreatePost user={user} 
                // handleAddPost={handleAddPost}
            />
            <PostList posts={state.posts}></PostList>
            {/* <button onClick={()=>setCount(prev=>prev+1)}>{count} + </button> */}
        </UserContext.Provider>
        </PostContext.Provider>
        );
    }   
}

export default App;