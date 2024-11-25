import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApjxCBvwLVsW8B6WFLsgJ3AxCoMEM8--I",
  authDomain: "app-de-clima-cd5ef.firebaseapp.com",
  projectId: "app-de-clima-cd5ef",
  storageBucket: "app-de-clima-cd5ef.appspot.com",
  messagingSenderId: "157882657628",
  appId: "1:157882657628:web:3a8df06718e466630eef99",
  measurementId: "G-TRHDBC0V03",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuario logueado con Google:", user);

      // Redirigir al dashboard después del login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      alert("Error al iniciar sesión con Google. Por favor, intenta nuevamente.");
    }
  };

  // Inicio de sesión con correo y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Usuario logueado con correo:", user);

      // Redirigir al dashboard después del login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión con correo:", error);
      alert("Usuario o contraseña incorrectos. Por favor, intenta nuevamente.");
    }
  };

  // Redirigir al registro
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundColor: "#FFFDC4",
        padding: "50px",
        textAlign: "center",
      }}
    >
      <h2>🌦️ App de Clima</h2>
      <h3>Iniciar Sesión</h3>
      
      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            margin: "10px",
            padding: "10px",
            width: "80%",
          }}
          required
        />
        <button
          type="submit"
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Botón de inicio de sesión con Google */}
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#FF5733",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleGoogleLogin}
      >
        Iniciar sesión con Google
      </button>

      {/* Botón para redirigir al registro */}
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleRegisterRedirect}
      >
        Registrarse
      </button>
    </div>
  );
};

export default Login;
