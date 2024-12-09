import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <div className="container p-5 bg-white shadow rounded" style={{ width: "550px" }}>
                    <h1 className="mb-4">Regístrate</h1>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Nombre Apellido" />
                        <label htmlFor="floatingInput">NOMBRE</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">CONTRASEÑA</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">REPETIR CONTRASEÑA</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">EMAIL</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="EJ: '¿CUÁL ES MI ANIMAL FAVORITO?" />
                        <label htmlFor="floatingInput">ESTABLEZCA UNA PREGUNTA DE SEGURIDAD</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="PERRO" />
                        <label htmlFor="floatingInput">RESPUESTA:</label>
                    </div>
                    <button className="btn btn-primary" style={{ width: "100%" }}>Registrarme</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;