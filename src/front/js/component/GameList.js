import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/styles/gameList.css';

export const GameList = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const handleGameClick = (id) => {
        navigate(`/game/${id}`);
    };

    return (
        <div className="game-list-container">
            <div className="filters">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Rating</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Relevancia</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Precio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Sorpréndeme</a>
                    </li>
                </ul>
                <button className="btn btn-secondary advanced-search">Búsqueda avanzada</button>
            </div>

            <div className="games-table">
                {Array.isArray(store.videogames) && store.videogames.length > 0 ? (
                    store.videogames.map((game) => (
                        <div key={game.id} className="game-row" onClick={() => handleGameClick(game.id)}>
                            <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appId}/capsule_231x87.jpg`} alt={game.name} className="game-image" />
                            <div className="game-info">
                                <h4>{game.name}</h4>
                                <p>Información extra</p>
                            </div>
                            <button className="favorite-btn">❤️</button>
                            <button className="price-btn">Precio</button>
                        </div>
                    ))
                ) : (
                    <p>No hay videojuegos disponibles</p>
                )}
            </div>
        </div>
    );
};
