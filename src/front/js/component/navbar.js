import React from "react";
import { Link } from "react-router-dom";
import logotipo from "../../img/PatasperdidasPNG.png"
export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
			<div className="container">
				<a className="navbar-brand " href="#">
					<img src={logotipo} alt="logo" classname=""  />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link" href="#">
								Inicio
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Mapa
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								¿Qué es?
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">
								Contacto
							</a>
						</li>
						<li className="nav-item">
							<form>
								<input ClassName="" name="fsrch" id="fsrch" placeholder="Search" />
							</form>
						</li>
					</ul>
					<button className="btn btn-primary ms-3 rounded-pill ">Iniciar sesión</button>
				</div>
			</div>
		</nav>
	);
};
