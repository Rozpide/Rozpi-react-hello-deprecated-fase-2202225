import React, { useState } from "react";

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [view, setView] = useState("menu"); // Puede ser: "menu", "signup", "login"

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <span className="navbar-brand" style={{ color: "yellow", fontWeight: "bold" }}>
                All Games DB
            </span>

            <div className="ml-auto">
                <div className="dropdown">
                    {/* Botón que abre el dropdown */}
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            setDropdownOpen(!isDropdownOpen);
                            setView("menu");
                        }}
                    >
                        Signup/Login
                    </button>


                    {isDropdownOpen && (
                        <div className="dropdown-menu show" style={{ display: "block", position: "absolute", right: 0, padding: "10px", width: "250px" }}>


                            {view === "menu" && (
                                <ul className="list-unstyled">
                                    <li>
                                        <button className="dropdown-item" onClick={() => setView("signup")}>Singup</button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => setView("login")}>Login</button>
                                    </li>
                                </ul>
                            )}



                            {view === "signup" && (
                                <div>
                                    <h5 className="dropdown-header">Register</h5>
                                    <form>
                                        <div className="mb-2">
                                            <input type="text" className="form-control" placeholder="Nombre de usuario" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="password" className="form-control" placeholder="Password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Register</button>
                                    </form>
                                    <button className="btn btn-link w-100 mt-2" onClick={() => setView("menu")}>Go Back</button>
                                </div>
                            )}


                            {view === "login" && (
                                <div>
                                    <h5 className="dropdown-header">Login</h5>
                                    <form>
                                        <div className="mb-2">
                                            <input type="email" className="form-control" placeholder="Correo electrónico" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="password" className="form-control" placeholder="Contraseña" />
                                        </div>
                                        <button type="submit" className="btn btn-success w-100">Login</button>
                                    </form>
                                    <button className="btn btn-link w-100 mt-2" onClick={() => setView("menu")}>Go back</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


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
