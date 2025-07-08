import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DBservice from "../../appwrite/appwriteConfig";
import Container from "../container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "../../index.css";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (slug) {
      DBservice.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    DBservice.deletePost(post.$id).then((status) => {
      if (status) {
        DBservice.deleteFile(post.imageID);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="max-w-3/4 flex mb-4 relative border-2 rounded-xl p-4 mx-auto bg-gradient-to-b from-zinc-900 via-cyan-950 to-zinc-800">
          <div className="flex flex-wrap m-4">
            <div className="w-full mt-8 mb-2">
              <div className="lg:text-2xl md:text-xl sm:text-base text-white font-bold">{post.title}</div>
            </div>
            <div className="w-full text-center text-base text-white/40 mb-6">
              <p>Posted on: {new Date(post.$createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric', month: 'short', day: 'numeric'
                })}
              </p>
              {post.$createdAt!==post.$updatedAt && <p>Last updated on: {new Date(post.$updatedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>}
            </div>
            {post?.imageID && (
              <img
                src={DBservice.getFilePreview(post.imageID)}
                alt={post.title}
                className="rounded-xl w-2/3 mx-auto m-4"
              />
            )}

            <div className="browser-css w-full bg-stone-400 rounded-xl p-4 mx-auto">
              {post?.content ? parse(post.content) : <div>No content!</div>}
            </div>
          </div>
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="bg-green-400 hover:bg-green-500 w-auto px-4 py-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="bg-green-400 hover:bg-green-500 w-auto px-4 py-2 rounded-lg mr-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
