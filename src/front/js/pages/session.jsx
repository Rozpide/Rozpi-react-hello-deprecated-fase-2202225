import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Session = () => {
    useEffect(() => {
        
        // voy a comprobar que en el context existe un valor de profile
        //si existe dejo que el usuario navegue, si no:
            // voy a comprobar  que hay un valor de token en local storage
            // si existe ese valor me traigo el profile de BE, si no:
              // redirijo a login
    }, [])


    return (<>
        <h1>Session</h1>
    </>)
}