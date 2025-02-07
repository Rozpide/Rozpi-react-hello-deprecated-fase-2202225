import React, { useState, useEffect } from 'react';
import { Loader } from "../component/loader";

export const Tienda = () => {
  const [isLoading, setIsLoading] = useState(false);

 

   const waitingWearever = async() => {
       await new Promise((resolve) => {
            setTimeout(() => resolve, 1000)
        })
     }
  

    const inicioLoader = async () => {
      setIsLoading(true);
        await waitingWearever();
        setIsLoading(false);
      
    }
      
    useEffect(() => {
       inicioLoader();
    }, []) 

  

  return (isLoading) ? <Loader /> : (
    <h1>Tienda</h1>
  )
}
