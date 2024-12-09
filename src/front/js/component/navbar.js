import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Chikitin Express
				</Link>
				<div className="navbar-buttons">
					<Link to="/shop">
						<button className="btn modern-btn secondary-btn">Shop</button>
					</Link>
					<Link to="/cart">
						<button className="btn modern-btn secondary-btn">Cart</button>
					</Link>
					<Link to="/order-history">
						<button className="btn modern-btn secondary-btn">Order History</button>
					</Link>
					<Link to="/notifications">
						<button className="btn modern-btn secondary-btn">Notifications</button>
					</Link>
					<Link to="/login">
						<button className="btn modern-btn primary-btn">Login</button>
					</Link>
					<Link to="/register">
						<button className="btn modern-btn secondary-btn">Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
