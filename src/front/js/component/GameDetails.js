import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/GameDetails.css';

export const GameDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        actions.fetchGameDetails(store.selectedGame["app_id"]);
        console.log(store.videogames);
    }, [id]);

    const game = store.selectedGame;

    if (!game) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='row text-center justify-content-center'>
            <div className='d-flex flex-column col-lg-5 col-11 mx-auto'>
                <img src={game.image} alt={game.name} />
                <p>{game.shortDescription}</p>
                {/* Details*/}
            </div>
            <div className='d-flex flex-column col-lg-5 col-11 mx-auto'>
                <h1>{game.name}</h1>
                <table className='table table-bordered border-primary'>
                    <thead>
                        <tr>
                            <th scope="col">Steam</th>
                            <th scope="col">G2A</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{game.steam_price} €</td>
                            <td>{game.g2a_price} €</td>
                        </tr>
                        <tr>
                            <td colspan="2">Tags:</td>
                        </tr>
                    </tbody>

                </table>
                <div className='d-flex justify-content-center align-items-center  mx-auto border border-success border-4 rounded-circle fluid-ratio'>
                    {game.score} %
                </div>
            </div>
        </div>
    );
};
//mapear videogames