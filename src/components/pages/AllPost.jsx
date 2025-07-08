import React, {useState, useEffect} from "react";
import DBservice from "../../appwrite/appwriteConfig";
import PostCard from "../PostCard";
import Container from "../container/Container";
import { useSelector } from "react-redux";

function AllPost(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        DBservice.listPost()
        .then((posts) => {
            if(posts) setPosts(posts.documents);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
    },[])
    return (
        <div className="w-full py-6 bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-800">
            <Container>
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
    )
}

export default AllPost;