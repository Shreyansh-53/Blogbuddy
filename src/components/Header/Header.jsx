import React from "react";
import { Link, NavLink, } from "react-router-dom";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Container from "../container/Container";
import { useSelector } from "react-redux";

function Header(){
    const authStatus = useSelector((state) => state.auth.authStatus);
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            active: !authStatus
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
        <header className="sticky top-0 z-50 shadow bg-neutral-900 border-2 border-y-black">
            <Container>
                <nav className="bg-neutral-900 border-black px-4 lg:px-4 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <Link to='/'>
                            <Logo Class='lg:w-50 md:w-50 sm:w-40 w-40 md:ml-8 sm:ml-6 ml-6 mt-1 mb-1' />
                        </Link>
                        <ul className="flex justify-between items-center text-lg text-neutral-400 lg:flex-row lg:space-x-4 lg:mt-0 lg:order-1">
                            {navItems.map((item) => item.active? (
                                <li key={item.name}>
                                    <NavLink to={item.slug} className={({isActive}) => `${isActive? "text-green-400" : "text-white hover:text-green-300"} inline-block px-5 py-1.5 duration-150 rounded-full  ${['Login','Sign Up'].includes(item.name) ? "bg-slate-800 outline-1 outline-cyan-600 hover:outline-green-400 hover:outline-2" : "bg-transparent"} `}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null)}
                            {authStatus && 
                            <li className="flex items-center lg:order-2">
                                <LogoutBtn />
                            </li>
                            }
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;
