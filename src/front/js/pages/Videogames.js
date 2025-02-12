import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/styles/videogames.css";


export const Videogames = () => {
    const { store } = useContext(Context);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Lista de Videojuegos</h1>
            <div className="row">
                {store.videogames.map(game => (
                    <div key={game.id} className="col-md-4">
                        <div className="card">
                            <img src={require(`../../img/${game.image}`)} className="card-img-top" alt={game.name} />
                            <div className="card-body">
                                <h5 className="card-title">{game.name}</h5>
                                <p className="card-text"><strong>Género:</strong> {game.genre}</p>
                                <p className="card-text"><strong>Plataforma:</strong> {game.platform}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
