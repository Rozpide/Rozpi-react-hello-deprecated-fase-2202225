import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import logo from "../../img/logo.jpg"

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link className="logoHome" to="/home">
					<img className="image"
						src={logo}
					/>
				</Link>
				<Link to="">
					<button className="btn ">Home</button>
				</Link>
				<Link to="">
					<button className="btn ">Cuídate</button>
				</Link>
				<Link to="">
					<button className="btn ">Tienda</button>
				</Link>
				<Link to="">
					<button className="btn ">Blog</button>
				</Link>
				<Link to="/aboutus">
					<button className="btn">Conócenos</button>
				</Link>
				<div className="registerArea ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">LogIn</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
