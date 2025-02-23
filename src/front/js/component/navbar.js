import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-primary">SALIR A HOME</button>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">ACCEDE CON TUS CREDENCIALES</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
