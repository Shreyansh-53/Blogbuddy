import React, {useState, useEffect} from "react";
import DBservice from "../../appwrite/appwriteConfig";
import PostCard from "../PostCard";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function YourPosts(){
    const [posts,setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        DBservice.listPost(userData.$id)
        .then((posts) => {
            if(posts) setPosts(posts.documents);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
    },[])
    if(posts.length!==0){return (
        <div className="w-full py-6 bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-800">
            <Container>
                <div className="w-full flex flex-wrap">
                    <div className="p-2 text-xl w-full font-bold text-white m-2 mt-4">Active posts are visible to all.</div>
                    <div className="p-2 text-xl w-full font-bold text-white m-2">Inactive posts are visible only to you.</div>
                </div>
                <div className="flex">
                    <div className="font-bold text-2xl m-4 text-white ml-4">Recent Posts -</div>
                </div>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="xl:w-1/4 grid-cols-4 lg:w-1/3 lg:grid-cols-3 md:w-1/2 md:grid-cols-2 sm:w-screen sm:grid-cols-1 p-2">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )}
    else{
        return(
            <div className="w-full py-6 bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-800">
                <Container>
                    <div className="flex flex-wrap items-center justify-center gap-y-4">
                        <div className="flex text-center text-white font-bold p-2 xl:mt-12 lg:mt-12 md:mt-8 mt-8">Blogging is not about publishing as much as you can. It&apos;s about publishing as smart as you can.</div>
                        <div className="flex text-center text-white font-bold p-2">Share your Thoughts to our collection.</div>
                        <div className="mt-8 justify-center flex mb-8 flex-wrap w-full">
                            <div className="flex w-full justify-center">
                                <div className="flex text-center text-white font-bold p-3">Write your first Blog and post it now! </div>
                                <NavLink
                                to={`/add-post`}
                                className="flex mt-3 px-4 text-green-400 hover:text-green-300"
                                >
                                    Post Blog 
                                </NavLink>
                            </div>
                        </div>
                    </div> 
                </Container>
            </div>
        )
    }
}

export default YourPosts;