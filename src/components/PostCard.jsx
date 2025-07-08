import React from "react";
import { Link } from 'react-router-dom'
import DBservice from "../appwrite/appwriteConfig";

function PostCard({$id,$createdAt,$updatedAt,title,imageID,status}){
    const edited = $createdAt !== $updatedAt;
    return(
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-black rounded-xl p-4">
                <div className="w-full justify-center m-2 mx-auto mb-4">
                    {status==='inactive'&& <span className="p-1 text-sm bg-green-500 rounded font-bold text-black">{status}</span>}
                </div>
                <div className="w-full justify-center m-2 mx-auto mb-4">
                    <img src={DBservice.getFilePreview(imageID)} alt={title} className="rounded-xl"/>
                </div>
                <div className="truncate w-full font-bold text-white text-xl mx-auto mb-2">{title}</div>
                <div className="w-full text-center text-sm text-white/40 mb-2">
                    <p>Posted on: {new Date($createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric'
                        })}
                    </p>
                    {edited && <p>Last updated on: {new Date($updatedAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </p>}
                </div>
            </div>
        </Link>
    )
}

export default PostCard;