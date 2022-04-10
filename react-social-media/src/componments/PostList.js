import React from "react";
import Post from "./Post";

function PostList({posts}) {
    return <div>
    {posts.map((post)=>(<Post key={post.id} 
                            id={post.id} 
                            image={post.image} 
                            content={post.content} 
                            user={post.user}/>))}
    </div>;
}

export default PostList;