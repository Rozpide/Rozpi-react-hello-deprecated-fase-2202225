import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Loader } from "../component/loader";
import Slider from '../component/slider'
 


export const Home = () => {

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

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  return (isLoading) ? <Loader /> : (
    <>
    <Slider />
    </>
  )
}
