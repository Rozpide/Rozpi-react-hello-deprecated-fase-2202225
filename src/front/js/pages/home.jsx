import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel  from '../component/slider';
import Button from 'react-bootstrap';
import Slider from '../component/slider';
import JumbotronFix from '../component/jumbotron';
import { Loader } from "../component/loader";


export const Home = () => {
  const eliminarToken = () => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        console.log('Token eliminado');
        alert('Has cerrado sesión correctamente');
    } else {
        console.log('No hay token almacenado');
        alert('Primero inicia sesión');
    }
}

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
    <button onClick={eliminarToken}>Log out</button>
    <Slider />
    </>
  )
}
