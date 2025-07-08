import React from "react";
import Container from "../container/Container";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { NavLink,Link } from "react-router-dom";

function Home(){
    const authStatus = useSelector((state) => state.auth.authStatus);
    if(!authStatus){
        return (
            <div className="w-full py-8 bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-800">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="flex w-full mt-4 mb-4 justify-center">
                            <Link to="/">
                                <Logo Class="lg:w-80 md:w-60 sm:w-50 w-50 mt-1 mb-1" />
                            </Link>
                        </div>
                        <div className="justify-center w-full flex flex-wrap">
                            <div className="text-center p-2 text-2xl w-full font-bold text-white lg:mt-8">Welcome to Blogbuddy — a place to share, read, and explore diverse ideas.</div>
                            <div className="text-center p-2 text-2xl w-full font-bold text-white lg:mt-2 mb-4">Create your own posts or dive into topics that spark your interest.</div>
                        </div>
                    </div>
                        <div className="mt-8 justify-center flex mb-8">
                            <div className="text-center text-white font-bold p-3">Explore blogging - </div>
                            <div className="flex gap-2 mx-2">
                                <NavLink
                                    to={`/login`}
                                    className=" mt-3 px-4 text-green-400 hover:text-green-300"
                                    >
                                    Login
                                </NavLink>
                                <div className="text-white font bold mt-3">/</div>
                                <NavLink
                                    to={`/signup`}
                                    className="mt-3 px-4 text-green-400 hover:text-green-300"
                                    >
                                    SignUp
                                </NavLink>
                            </div>
                        </div>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div className="w-full py-8 bg-gradient-to-b from-gray-900 via-emerald-900 to-gray-800">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="flex w-full mt-4 mb-4 justify-center">
                            <Link to="/">
                                <Logo Class="lg:w-80 md:w-60 sm:w-50 w-50 mt-1 mb-1" />
                            </Link>
                        </div>
                        <div className="justify-center w-full flex flex-wrap">
                            <div className="text-center p-2 text-2xl w-full font-bold text-white lg:mt-8">Welcome to Blogbuddy — a place to share, read, and explore diverse ideas.</div>
                            <div className="text-center p-2 text-2xl w-full font-bold text-white lg:mt-2 mb-4">Create your own posts or dive into topics that spark your interest.</div>
                        </div>
                    </div>
                    <div className="mt-8 justify-center flex mb-8 flex-wrap w-full gap-y-2 my-2">
                        <div className="flex w-full justify-center">
                            <div className="flex text-center text-white font-bold p-3">Ready to Write? </div>
                            <NavLink
                            to={`/add-post`}
                            className="flex mt-3 px-4 text-green-400 hover:text-green-300"
                            >
                                Blog Now!
                            </NavLink>
                        </div>
                        <div className="flex w-full justify-center">
                            <div className="flex text-center text-white font-bold p-3">Explore recent Blogs: </div>
                            <NavLink
                            to={`/all-posts`}
                            className="flex mt-3 px-4 text-green-400 hover:text-green-300"
                            >
                                Explore!
                            </NavLink>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home;