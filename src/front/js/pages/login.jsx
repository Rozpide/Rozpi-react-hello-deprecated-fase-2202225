import React from "react";
import "../../styles/login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST", 
        body: JSON.stringify({email: email, password: password}), 
        headers: {"Content-Type": "application/json"}})
      const data = await response.json()
      if (!response.ok){
        alert("Email o contraseña incorrecta")
        console.log(data)
      }
      else{
        console.log(data)
        localStorage.setItem("token", data.token)
        navigate("/session");
      }
    }


    return(
    <>
    <section>
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
        />
        <input 
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={e => setPassword(e.target.value)} 
        />
        <button> Entrar </button>
      </form>
    </section>
    </>
    )
}

export default Login