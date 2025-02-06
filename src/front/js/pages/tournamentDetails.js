import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { BracketCard16 } from "../component/bracketCard16.jsx";
import { BracketCard8 } from "../component/BracketCard8.jsx";
import { TeamCard } from "../component/TeamsCard.jsx";

export const TournamentDetails = () => {

    const { store, actions } = useContext(Context)
    const params = useParams()

    useEffect(() => {
        // Solo llamamos a getOneTournament cuando el Id cambia
        if (params.id) {
            actions.getOneTournament(params.id);


            console.log("Tournament ID:", params);
            console.log("token:", localStorage.getItem("token"));
            console.log("Equipos guardados:", store.torneo.teams);
            console.log("torneo", store.torneo);
            console.log("tournament", store.tournaments);

        }
    }, [params.id]);

    const handleSubmit = () => {
        if (params.id) {
            actions.registerParticipant(params.id);
        } else {
            console.error("Error: tournamentId está undefined");
        }
    };

    return (
        <>
            <div className="card">
                <div className="d-flex justify-content-around">
                    <div>
                        <figure>
                            <img src={store.torneo?.image} />
                            <figcaption className="text-center">
                                {store.torneo?.name}
                            </figcaption>
                        </figure>
                    </div>
                    <div>
                        <p>Tipo de torneo: {store.torneo?.type}</p>
                        <p>Nombre del host: {store.torneo?.host?.name}</p>
                        <p>Dirección: {store.torneo?.host?.address}</p>
                        <p>Fecha: {new Date(store.torneo?.schedule).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>Hora: {new Date(store.torneo?.schedule).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>Rating del torneo: {store.torneo?.rating}</p>
                        <p>Coste de inscripción: {store.torneo?.inscription_fee}</p>
                        <p>Recompensas: {store.torneo?.award}</p>
                        <p>Ganador del torneo: {store.torneo?.tournament_winner}</p>
                        <p>Total de participantes: {store.torneo?.participants_amount}</p>
                        <p>Participantes registrados: {store.torneo?.participants_registered}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>Participar</button>
                    {store.host_info?.id === store.torneo?.host?.id && (
                    <Link to={`/edit-tournament/${params.id}`} className="btn btn-warning">Editar</Link>
                    )}  
                </div>
            </div>

            <br />

            <div className="container d-flex justify-content-center">
                {store.torneo?.participants && store.torneo.teams?.length > 0 ? (
                    store.torneo.teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))
                ) : (
                    <p className="m-3">Aun no hay equipos registrados aún.</p>
                )}
            </div>

            <br />
            {/* {store.torneo?.teams && store.torneo.matches?.length == store.torneo. ? ( */}
            <BracketCard16 tournament={store.torneo} />

            <BracketCard8 tournament={store.torneo} />
        </>
    )
}
