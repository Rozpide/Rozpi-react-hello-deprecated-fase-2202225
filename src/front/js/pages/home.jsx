import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel  from '../component/slider';
import Button from 'react-bootstrap';
import Slider from '../component/slider';
import JumbotronFix from '../component/jumbotron';
import { Loader } from "../component/loader";


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

  return (isLoading) ? <Loader /> : (
    <>
    <Slider />
    </>
  )
}
