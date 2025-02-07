import React, { useState, useContext, useEffect } from "react";
import "../../styles/login.css"
import { useNavigate } from "react-router-dom";
import { Loader } from "../component/loader";
import { Context } from "../store/appContext";


export const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { actions } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      return () => clearTimeout(timer); 
    }, []);
  
  


  const handleSubmit = async (e) => {
    e.preventDefault()
    const isLoged = await actions.login(email, password)
    if (isLoged) {
      navigate("/session/home");
    }
    else {
      alert("Email o contraseña incorrecta")
    }
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
    <>
    
      <section className="container">
          <h1>Log in</h1>

          <form
            className="formulario"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={email}
              placeholder="Correo electrónico"
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button className="btn"> Entrar </button>
          </form>
        
      </section>
      </>
  )
}
