import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const GameDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        actions.fetchGames(id);
        console.log(store.videogames);
        
    }, [id]);

    const game = store.selectedGame;

    if (!game) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.image} alt={game.name} />
            <p>{game.description}</p>
            {/* Details*/}
        </div>
    );
};
//mapear videogames