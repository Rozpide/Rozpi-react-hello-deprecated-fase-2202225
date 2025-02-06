import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const Session = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        if (!!store.profile){
            return 
        }
        else if (!!localStorage.getItem("token")){
            actions.getProfile()
        }

        // voy a comprobar que en el context existe un valor de profile
        //si existe dejo que el usuario navegue, si no:
            // voy a comprobar  que hay un valor de token en local storage
            // si existe ese valor me traigo el profile de BE, si no:
              // redirijo a login
    }, [])


    return (<>
        <h1>Session</h1>
        <Link to="profile">
            <button>Go to profile</button>
        </Link>
    </>)
}