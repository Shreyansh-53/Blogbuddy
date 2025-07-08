import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { useSelector } from "react-redux";

function Footer(){
    const authStatus = useSelector((state) => state.auth.authStatus);
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'My Posts',
            slug: '/my-posts',
            active: authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/add-post',
            active: authStatus
        },
    ]
    return(
        <footer className="bg-neutral-900 relative border-2 border-y-black">
            <div className="mx-auto w-full relative max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-2 items-center">
                        <Logo Class='lg:w-80 md:w-70 w-60 sm:w-60 mx-3' />
                    </div>
                    <div className="grid grid-cols-2 sm:gap-5 sm:grid-cols-3">
                        <div className="mx-6">
                            <h2 className="mb-6 text-sm font-semibold text-neutral-200 uppercase">Resources</h2>
                            <ul className="text-neutral-500 text-sm font-medium list-none">
                                {navItems.map((item) => item.active? (
                                    <li className="mb-4" key={item.name}>
                                        <NavLink to={`${item.slug}`} className= {({isActive}) => `hover:text-neutral-200 ${isActive? "text-neutral-300" : ""}`}>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null)}
                            </ul>
                        </div>
                        <div className="mx-6">
                            <h2 className="mb-6 text-sm font-semibold text-neutral-200 uppercase">Follow us</h2>
                            <ul className="text-neutral-500 text-sm font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/Shreyansh-53"
                                        className="hover:text-neutral-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a
                                        href="https://www.linkedin.com/in/shreyansh-nema-762893320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                        className="hover:text-neutral-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2025 &nbsp;
                        <a href="https://github.com/Shreyansh-53" className="hover:underline">
                            Shreyansh Nema
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
