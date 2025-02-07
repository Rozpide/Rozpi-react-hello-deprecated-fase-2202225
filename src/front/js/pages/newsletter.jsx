import React, {useState, useEffect} from 'react'
import { Loader } from "../component/loader";


export const Newsletter = () => {

  const [isLoading, setIsLoading] = useState(false);
        useEffect(() => {
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 1500);
      
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
    <h1>Newsletter</h1>
  )
}
