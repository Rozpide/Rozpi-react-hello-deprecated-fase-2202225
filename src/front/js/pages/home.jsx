import React, { useState, useEffect } from "react";
import { Loader } from "../component/loader";

export const Home = () => {
  

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
    


  return (isLoading) ? <Loader /> : (
    <h1>This is the home</h1>
  )
}
