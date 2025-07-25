import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({children,authentication=true}){
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.authStatus);
    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/login');
        } else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        setLoader(false)
    },[navigate,authentication,authStatus])
    return loader? <div className="loader"></div> : <>{children}</>;
}