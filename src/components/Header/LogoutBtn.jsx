import React from "react";
import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth';
import {logout} from '../../store/authSlice';

function LogoutBtn(){
    const dispatch = useDispatch();
    const logoutBtn = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error) => {
            console.log("LogoutBtn error:", error);
        })
    }

    return(
        <button onClick={logoutBtn} className="inline-block rounded-full bg-slate-800 text-white hover:outline-cyan-100 hover:outline-1 mx-2 px-5 py-2">Logout</button>
    )
}

export default LogoutBtn;