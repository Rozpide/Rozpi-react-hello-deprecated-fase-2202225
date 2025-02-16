import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import { useNavigate } from 'react-router-dom';

import "/workspaces/Fs-Spain_85-AllGamesDB/src/front/styles/gamesearchlist.css";


export const GameSearchList = () => {
    const [ tags, setTags ] = useState([])
    const  [currentPage, setCurrentPage] = useState(1)
    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const handleGameClick = (id) => {
        navigate(`/game/${id}`);
    };

    useEffect(() => {
        const fetchTagsData = async () => {
            const tags = await actions.fetchTags();
            setTags(tags);
        };
        fetchTagsData();
    }, []);

    async function handlePagination(page) {
        setCurrentPage(page)
        actions.fetchGames(page);
    }

    return (
        <div className="d-flex">
            <div className="search-editor border d-flex row p-2">
                <h4>Tags: </h4>
                <div className="d-flex align-content-center row justify-content-around">
                    {store.tags.length > 0 ? store.tags.slice(0, 20).map((tag, index) => (
                    <div key={index} className="col-3 border">
                        <p>{tag}</p>
                    </div>
                    ))
                    
                    :
                    <p> Loading Tags... </p>}
                </div>
            </div>
            <div className="games-search-table">
                {Array.isArray(store.videogames) && store.videogames.length > 0 ? (
                    store.videogames.map((game) => (
                        <div key={game.id} className="game-row" onClick={() => handleGameClick(game.id)}>
                            <img src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/capsule_231x87.jpg`} alt={game.name} className="game-image"/>
                            <div className="game-info">
                                <h4>{game.name}</h4>
                                {game.game_tags.slice(0, 3).map((tag, index) => tag.tag_name).join(', ')}
                            </div>
                            {/* <button className="favorite-btn">❤️</button> */}
                            <button className="price-btn">{game.steam_price > game.g2a_price ? game.g2a_price : game.steam_price} €</button>
                        </div>
                    ))
                    
                ) : (
                    <p>No hay videojuegos disponibles</p>
                )}
                <nav aria-label="..." className="float-end ">
                    <ul className="pagination align-middle my-2">
                        <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`} >
                            <a className="page-link" onClick={() => handlePagination(currentPage - 1 )} href="#">Previous</a>
                        </li>
                        <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item" >
                            <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">4</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">5</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" onClick={() => handlePagination(currentPage + 1 )} href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};
