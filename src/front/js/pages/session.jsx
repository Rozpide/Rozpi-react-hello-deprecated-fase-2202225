
import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { Loader } from "../component/loader";
import { Context } from "../store/appContext";


import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isAuthenticated = token !== null && token !== undefined && token !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }



        // voy a comprobar que en el context existe un valor de profile
        //si existe dejo que el usuario navegue, si no:
            // voy a comprobar  que hay un valor de token en local storage
            // si existe ese valor me traigo el profile de BE, si no:
              // redirijo a login
    }, [])
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(timer); 
    }, []);

    const inicioLoader = async () => {
          setIsLoading(true);
            await waitingWearever();
            setIsLoading(false);
      
        }
      
        useEffect(() => {
            inicioLoader();
        }, []) 


    return (isLoading) ? <Loader /> : (<>
        <h1>Session</h1>
    </>)
}

  return <Outlet />;
};
