import React from "react";
import {UserContext,PostContext} from '../App';

function Post({image,content,user,id}){
    const { dispatch } = React.useContext(PostContext);
    const currentUser = React.useContext(UserContext);
    const isCurrentUser = currentUser === user;

    function handleDeletePost(){
        dispatch({type:"DELETE_POST",payload:{id:id}});
    }

    return (
        <>
        <div>
        <p>{content}</p>
        <div style={{color:isCurrentUser&&'green'}}>{user}</div>
        </div>
        {image && (
            <img
                style={{height:100, width:200, obejct:'cover'}}
                src = {URL.createObjectURL(image)}
                alt = "Post cover"
            />)} 
        { isCurrentUser && <button onClick={handleDeletePost}>Delte</button>}
        </>
    );
}

export default Post;