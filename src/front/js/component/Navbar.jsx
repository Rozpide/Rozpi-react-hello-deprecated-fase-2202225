import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light"  style={{background: '#FE5558'}}>
			<div className="container">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="navbar-brand mb-0 h1">JourNavi</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-dark">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
