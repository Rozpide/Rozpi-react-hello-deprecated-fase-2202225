import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./Login";
import Logo from "../../img/Logo.png";
import gear_colored from "../../img/gear_colored.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const username = store.username;
    const token = store.userToken;
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLoginSuccess = (username, password) => {
        actions.login(username, password);
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query); // Update the local state
        actions.searchCoins(query); // Fetch autocomplete suggestions
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        actions.searchCoins(searchQuery); // Perform the full search
        navigate("/searchresults"); // Navigate to results page
    };

    const handleSuggestionClick = (coinName) => {
        setSearchQuery(coinName); // Update input with the selected suggestion
        actions.searchCoins(coinName); // Perform the search
        navigate("/searchresults");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo" width="75" height="75" className="d-inline-block align-top" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="listButton btn" to="/listingpage">List of Coins</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Crypto: Name/Symbol"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <button className="searchButton btn" type="submit">Search</button>

                            {/* Autocomplete Suggestions */}
                            {store.searchSuggestions.length > 0 && (
                                <ul
                                    className="dropdown-menu show"
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        zIndex: 10,
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "1px solid #39ff14",
                                    }}
                                >
                                    {store.searchSuggestions.map((coin) => (
                                        <li
                                            key={coin.id}
                                            className="dropdown-item"
                                            style={{ cursor: "pointer", color: "white" }}
                                            onClick={() => handleSuggestionClick(coin.name)}
                                        >
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </div>
                    {token ? (
                        <>
                            <span className="navbar-text text-light ms-3">Hello, {username}</span>
                            <button className="logoutButton btn ms-3" onClick={actions.logout}>Logout</button>
                        </>
                    ) : (
                        <button className="loginButton btn ms-3" onClick={() => setShowModal(true)}>Login</button>
                    )}
                    <div className="navGear dropdown ms-3">
                        <img
                            src={gear_colored}
                            alt="Profile"
                            width="60"
                            height="60"
                            className="rounded-circle dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ cursor: "pointer" }}
                        />
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li><span className="dropdown-item-text">Hello, {username || "Guest"}</span></li>
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/userdashboard#favorites"
                                    onClick={() => actions.setShowFavorites()}
                                >
                                    Favorites
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/userdashboard#overallHoldings"
                                    onClick={() => actions.setShowOverallHoldings()}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={actions.logout}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {showModal && (
                <Login
                    isLoginDefault={true}
                    onClose={() => setShowModal(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};
