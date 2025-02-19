// import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/styles/navbar.css";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

// export const Navbar = () => {
//     const [query, setQuery] = useState("");
//     const { store, actions } = useContext(Context);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [isSignupOpen, setIsSignupOpen] = useState(false);
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         email: "",
//         username: "",
//         password: ""
//     });
//     const navigate = useNavigate();

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const toggleSignup = () => {
//         setIsSignupOpen(!isSignupOpen);
//         setIsLoginOpen(false);
//     };

//     const toggleLogin = () => {
//         setIsLoginOpen(!isLoginOpen);
//         setIsSignupOpen(false);
//     };

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSignupSubmit = (e) => {
//         e.preventDefault();
//         console.log("Signup Data", formData);
//         setIsSignupOpen(false);
//     };

//     const handleGameClick = (game) => {
//         actions.setSpecificVideogameSteamId(game);
//         navigate(`/game/${game.id}`);
//         setQuery("");
//         actions.resetVideogameSearchNameResult();
//     };

//     useEffect(() => {
//         if (query === "") {
//             actions.resetVideogameSearchNameResult();
//             return;
//         }
//         const debounceAPI = setTimeout(() => {
//             const handleQuery = async () => {
//                 if (query.trim() !== "") {
//                     await actions.queryGameName(query);
//                 }
//             };
//             handleQuery();
//         }, 400);
//         return () => clearTimeout(debounceAPI);
//     }, [query]);

//     return (
//         <nav className="navbar">
//             <div className="container">
//                 <Link to="/" className="logo">All <span>Games DB</span></Link>

//                 <div className="nav-right">
//                     <div className="search-container">
//                         <input
//                             type="text"
//                             className="search-bar"
//                             placeholder="Search games"
//                             data-bs-toggle="dropdown"
//                             aria-expanded={isDropdownOpen ? "true" : "false"}
//                             value={query}
//                             onBlur={() => setTimeout(toggleDropdown, 100)}
//                             onFocus={toggleDropdown}
//                             onChange={e => setQuery(e.target.value)}
//                         />

//                         <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? "show" : "visually-hidden"}`}>
//                             {store.videogameSearchNameResult && store.videogameSearchNameResult.length > 0 ?
//                                 store.videogameSearchNameResult.map((game) => (
//                                     <li key={game.id}>
//                                         <a className="dropdown-item" onClick={() => handleGameClick(game)}>
//                                             <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/capsule_184x69.jpg`} alt={game.name} className="game-image-search" />
//                                             <p className="game-name">{game.name} </p>
//                                             <p className="price">{game.steam_price > game.g2a_price ? game.g2a_price : game.steam_price} €</p>
//                                         </a>
//                                     </li>
//                                 ))
//                                 : ""}
//                         </ul>
//                     </div>

//                     <div className="nav-buttons">
//                         <div className="dropdown">
//                             <button className="btn btn-green" onClick={toggleSignup}>Signup</button>
//                             {isSignupOpen && (
//                                 <div className="dropdown-menu show signup-dropdown">
//                                     <form onSubmit={handleSignupSubmit} className="signup-form">
//                                         <div className="form-group">
//                                             <label htmlFor="email">Email:</label>
//                                             <input
//                                                 type="email"
//                                                 id="email"
//                                                 name="email"
//                                                 value={formData.email}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Enter your email"
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="form-group">
//                                             <label htmlFor="password">Password:</label>
//                                             <input
//                                                 type="password"
//                                                 id="password"
//                                                 name="password"
//                                                 value={formData.password}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Enter your password"
//                                                 required
//                                             />
//                                         </div>
//                                         <button type="submit" className="btn btn-submit">Register</button>
//                                     </form>
//                                 </div>
//                             )}
//                         </div>


//                         <div className="dropdown">
//                             <button className="btn btn-green" onClick={toggleLogin}>Login</button>
//                             {isLoginOpen && (
//                                 <div className="dropdown-menu dropdown-menu-end show login-dropdown">
//                                     <form className="login-form">
//                                         <div className="form-group">
//                                             <label htmlFor="login-email">Email:</label>
//                                             <input
//                                                 type="email"
//                                                 id="login-email"
//                                                 placeholder="Enter your email"
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="form-group">
//                                             <label htmlFor="login-password">Password:</label>
//                                             <input
//                                                 type="password"
//                                                 id="login-password"
//                                                 placeholder="Enter your password"
//                                                 required
//                                             />
//                                         </div>
//                                         <button type="submit" className="btn btn-submit">Login</button>
//                                     </form>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




























import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles/navbar.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [query, setQuery] = useState("");
    const { store, actions } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSignup = () => {
        setIsSignupOpen(!isSignupOpen);
        setIsLoginOpen(false);
    };

    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
        setIsSignupOpen(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signup Data", formData);
        setIsSignupOpen(false);
    };

    const handleGameClick = (game) => {
        actions.setSpecificVideogameSteamId(game);
        navigate(`/game/${game.id}`);
        setQuery("");
        actions.resetVideogameSearchNameResult();
    };
    useEffect(() => {
        if (query === "") {
            actions.resetVideogameSearchNameResult();
            return;
        }
        const debounceAPI = setTimeout(() => {
            const handleQuery = async () => {
                if (query.trim() !== "") {
                    await actions.queryGameName(query);
                }
            };
            handleQuery();
        }, 400);
        return () => clearTimeout(debounceAPI);
    }, [query]);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">All <span>Games DB</span></Link>

                <div className="nav-right">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search games"
                            data-bs-toggle="dropdown"
                            aria-expanded={isDropdownOpen ? "true" : "false"}
                            value={query}
                            onBlur={() => setTimeout(toggleDropdown, 100)}
                            onFocus={toggleDropdown}
                            onChange={e => setQuery(e.target.value)}
                        />

                        <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? "show" : "visually-hidden"}`}>
                            {store.videogameSearchNameResult && store.videogameSearchNameResult.length > 0 ?
                                store.videogameSearchNameResult.map((game) => (
                                    <li key={game.id}>
                                        <a className="dropdown-item" onClick={() => handleGameClick(game)}>
                                            <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/capsule_184x69.jpg`} alt={game.name} className="game-image-search" />
                                            <p className="game-name">{game.name} </p>
                                            <p className="price">{game.steam_price > game.g2a_price ? game.g2a_price : game.steam_price} €</p>
                                        </a>
                                    </li>
                                ))
                                : ""}
                        </ul>
                    </div>

                    <div className="nav-buttons">
                        <div className="dropdown">
                            <button className="btn btn-green" onClick={toggleSignup}>Signup</button>
                            {isSignupOpen && (
                                <div className="dropdown-menu show signup-dropdown">
                                    <form onSubmit={handleSignupSubmit} className="signup-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-submit">Register</button>
                                    </form>
                                </div>
                            )}
                        </div>


                        <div className="dropdown">
                            <button className="btn btn-green" onClick={toggleLogin}>Login</button>
                            {isLoginOpen && (
                                <div className="dropdown-menu dropdown-menu-end show login-dropdown">
                                    <form className="login-form">
                                        <div className="form-group">
                                            <label htmlFor="login-email">Email:</label>
                                            <input
                                                type="email"
                                                id="login-email"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-password">Password:</label>
                                            <input
                                                type="password"
                                                id="login-password"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-submit">Login</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;






