import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Txamanguillos</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
				    <button className="btn btn-primary">LogIn</button>
					</Link>
					<Link to="/aboutus">
						<button className="btn btn-primary m-1">Conócenos</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
