import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles/gameList.css";


export const GameList = () => {
    const { store } = useContext(Context);

    return (
        <div className="game-list-container">
            <div className="filters">
            <div className="filter-group">
        <button>Rating</button>
        <button>Relevancia</button>
        <button>Precio</button>
        <button>Sorpréndeme</button>
            </div>
                <button className="advanced-search">Búsqueda avanzada</button>
            </div>
            <div className="games-table">
                {store.videogames?.map((game, index) => (
                    <div key={index} className="game-row">
                        <img src={game.image} alt={game.name} className="game-image" />
                        <div className="game-info">
                            <h4>{game.name}</h4>
                            <p>Información extra</p>
                        </div>
                        <button className="favorite-btn">❤️</button>
                        <button className="price-btn">Precio</button>
                    </div>
                ))||[]}
            </div>
        </div>
    );
};



