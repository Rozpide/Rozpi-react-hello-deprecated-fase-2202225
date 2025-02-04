import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css"
import logo from "../../img/logo.jpg"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link className="logoHome" to="/">
					<img className="image"src={logo}/>
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
					<Link to="/signup">
				    	<button className="btn btn-primary">Sign Up</button>
					</Link>
				</div>
				<div className="registerArea ml-auto">
					<Link to="/login">
				    	<button className="btn btn-primary">Log In</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
