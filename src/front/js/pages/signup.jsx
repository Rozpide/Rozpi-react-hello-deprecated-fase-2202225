import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css"
import { Button } from "react-bootstrap";

export const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const actualizador = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setError(null); // Limpiar errores previos si los hay
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}> {/* Se corrige el evento onSubmit */}
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
        <Button className="button1" type="submit">Registrarse</Button>
      </form>
    </section>
  );
};