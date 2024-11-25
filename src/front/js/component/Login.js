import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Usuario logueado:", user);

      // Redirigir al dashboard después del login
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
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
      <button
        style={{
          margin: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleLogin}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;

