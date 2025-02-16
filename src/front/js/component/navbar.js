import React from "react";
import { Link } from "react-router-dom";
import "../../styles/styles/navbar.css"


export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">All <span>Games DB</span></Link>
                {/* <input type="text" className="search-bar" placeholder="Search" />
                <div className="nav-buttons">
                    <button className="favorites">⭐ Favoritos</button>
                    <button className="logout">🔴 Logout</button>
                </div> */}
            </div>
        </nav>
    );
};


// import React from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };
