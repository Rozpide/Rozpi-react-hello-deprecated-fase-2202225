import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import "../../styles/styles/navbar.css"
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [query, setQuery] = useState("")
    const { store, actions } = useContext(Context);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [view, setView] = useState("menu"); 
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleGameClick = (game) => {
        actions.setSpecificVideogameSteamId(game)
        navigate(`/game/${game.id}`);
        setQuery("")
        actions.resetVideogameSearchNameResult()
    };
    
    useEffect(() => {
        if (query === "") {
            actions.resetVideogameSearchNameResult()
            return
        }
        const debounceAPI = setTimeout(() => {
            const handleQuery = async () => {
                if (query.trim() !== "") {
                    await actions.queryGameName(query)
                }
            }
            handleQuery()
        }, 400)
        return () => clearTimeout(debounceAPI)
    },[query])
    

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">All <span>Games DB</span></Link>
                <div className="justify-content-center">
                    <input type="text" className="search-bar m-auto" placeholder="Search games" data-bs-toggle="dropdown" aria-expanded={isDropdownOpen ? "true" : "false"} value={query} onBlur={() => setTimeout(toggleDropdown, 100)} onFocus={toggleDropdown} onChange={e => setQuery(e.target.value)}/>
                    <ul className={`dropdown-menu dropdown-menu-end d-flex flex-column ${isDropdownOpen ? "show" : "visually-hidden"}`}>
                        {store.videogameSearchNameResult && store.videogameSearchNameResult.length > 0 ?
                            store.videogameSearchNameResult.map((game) => (
                                <li key={game.id}>
                                    <a className="dropdown-item d-flex flex-row" onClick={() => handleGameClick(game)}>
                                        <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/capsule_184x69.jpg`} alt={game.name} className="game-image-search my-auto" />
                                        <p className="game-name my-auto me-2">{game.name} </p>
                                        <p className="price my-auto">{game.steam_price > game.g2a_price ? game.g2a_price : game.steam_price} €</p>
                                    </a>
                                </li>
                            ))
                            :
                            ""
                        }
                    </ul>
                </div>
                {/* <div className="nav-buttons">
                    <button className="favorites">⭐ Favoritos</button>
                    <button className="logout">🔴 Logout</button>
                </div> */}
            </div>
        </nav>
    );
};

export default Navbar;


