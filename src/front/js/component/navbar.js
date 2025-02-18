import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/" className="navbar-brand">
                <span style={{ color: "yellow", fontWeight: "bold" }}>All Games DB</span>
            </Link>

            <div className="ml-auto">
                <div className="dropdown">
                    {/* Botón que abre el dropdown */}
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            setDropdownOpen(!isDropdownOpen);
                            setShowSignupForm(false); // Reiniciar vista del dropdown
                        }}
                    >
                        Acceder/Registrarse
                    </button>

                    {/* Dropdown visible si isDropdownOpen es true */}
                    {isDropdownOpen && (
                        <div className="dropdown-menu show" style={{ display: "block", position: "absolute", right: 0, padding: "10px", width: "250px" }}>

                            {/* Verificamos si el usuario quiere registrarse */}
                            {showSignupForm ? (
                                <div>
                                    <h5 className="dropdown-header">Registro</h5>
                                    <form>
                                        <div className="mb-2">
                                            <input type="text" className="form-control" placeholder="Nombre de usuario" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" className="form-control" placeholder="Correo electrónico" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="password" className="form-control" placeholder="Contraseña" />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                                    </form>
                                    <button className="btn btn-link w-100 mt-2" onClick={() => setShowSignupForm(false)}>Volver</button>
                                </div>
                            ) : (
                                <ul className="list-unstyled">
                                    <li>
                                        <button className="dropdown-item" onClick={() => setShowSignupForm(true)}>Signup</button>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/login">Login</Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

//vista de dashboard modificar
// export const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <div className="container">
//                 <Link to="/" className="logo">All <span>Games DB</span></Link>
//                 {/* <input type="text" className="search-bar" placeholder="Search" />
//                 <div className="nav-buttons">
//                     <button className="favorites">⭐ Favoritos</button>
//                     <button className="logout">🔴 Logout</button>
//                 </div> */}
//             </div>
//         </nav>
//     );
// };


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
