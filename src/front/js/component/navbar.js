import React, { useState } from "react";
import { Link } from "react-router-dom";
import logotipo from "../../img/PatasperdidasPNG.png"
export const Navbar = () => {
	const [logged, setLogged] = useState(false)
	const [user, setUser] = useState("Usuario");

	const handleLogin = () => {
		// Aquí podrías integrar lógica de autenticación
		setUser("Juan Pérez"); // Simula que obtuviste el nombre del usuario
		setLogged(true); // Cambia el estado a "logueado"
	};
	return (

		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div className="container ">
				<img className="ms-5" width="50" height="50" src={logotipo} alt="logo" />
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto ">
						<li className="nav-item">
							<a className="adlam-display-regular nav-link me-2" href="#">
								Inicio
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-2" href="#">
								Mapa
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-2" href="#">
								¿Qué es?
							</a>
						</li>
						<li className="nav-item">
							<a className="adlam-display-regular nav-link  me-2" href="#">
								Contacto
							</a>
						</li>
						<li className="nav-item d-flex align-items-center">
							<input className="form-control border-0  me-2" type="text" placeholder="🔎 Search" ></input>
						</li>
					</ul>
					{logged ? (
						<a href="#" className="ms-2 adlam-display-regular nav-link me-2">{user}</a>
					) : (
						<button className=" adlam-display-regular btn btn-primary ms-2 rounded-pill btnStart" onClick={handleLogin} >Iniciar sesión</button>
					)}
				</div>
			</div>
		</nav>
	);
};
