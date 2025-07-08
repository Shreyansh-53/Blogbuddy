import React from "react";

function Logo({Class}){
    return(
        <img src="/Logo.png" alt="Logo" className={`${Class}`} />
    )
}

export default Logo;