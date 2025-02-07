import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css"
import { Loader } from "../component/loader";


export const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  const actualizador = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar usuario");
      }

      alert("Registro exitoso");
      setError(null); 
      navigate("/login") ;
      setIsLoading(false);
      
    } catch (err) {
      setError(err.message);
    }
  };


 
    const inicioLoader = async () => {
      setIsLoading(true);
        await waitingWearever();
        setIsLoading(false);
  
    }
  
    useEffect(() => {
        inicioLoader();
    }, []) 

  return (isLoading) ? <Loader /> : (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}> {}
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={actualizador}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={actualizador}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={actualizador}
          required
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

