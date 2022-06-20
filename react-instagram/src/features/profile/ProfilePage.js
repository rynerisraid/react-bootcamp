import React from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage(){
    let params = useParams();
    return (
        <div>
            ProfilePage
            <h2>User: {params.username}</h2>
        </div>
    )
}