import React from "react";
import "../../styles/login.css"
import { useState } from "react";

export const Login = () => {
    

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const [error, setError] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if(email === "" || password === ""){
        setError(true)
        return
      }
      
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {method: "POST", body: JSON.stringify({email: email, password: password}), headers: {"Content-Type": "application/json"}})
      const data = await response.json()
      console.log(data)
      localStorage.setItem("token", data.token)

      setError(false)
  
      // setUser([nombre])
  
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
        onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <button> Entrar </button>
      </form>
      {error && <alert>Fill All</alert>}
    </section>
    </>
    )
}

export default Login