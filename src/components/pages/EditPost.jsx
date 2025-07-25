import React, {useState, useEffect} from "react";
import DBservice from "../../appwrite/appwriteConfig";
import PostForm from "../post-form/PostForm";
import Container from "../container/Container";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();
    useEffect(() => {
        if(slug){
            DBservice.getPost(slug).then((post) => {
                if(post){
                    setPost(post);
                }
            })
        }
        else {
            navigate('/');
        }
    },[slug,navigate])

    return post? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost;