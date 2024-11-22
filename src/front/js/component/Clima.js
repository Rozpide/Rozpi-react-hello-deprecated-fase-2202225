import React, { useState, useEffect } from 'react';
import { api } from '../axios';

const Clima = () => {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    const obtenerClima = async () => {
      const res = await api.get('/clima?ciudad=Santiago');
      setClima(res.data);
    };
    obtenerClima();
  }, []);

  if (!clima) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Clima en {clima.name}</h2>
      <p>Temperatura: {clima.main.temp}°C</p>
      <p>Descripción: {clima.weather[0].description}</p>
    </div>
  );
};

export default Clima;
