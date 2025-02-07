import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { BracketCard16 } from "../component/bracketCard16.jsx";
import { BracketCard8 } from "../component/BracketCard8.jsx";
import { TeamCard } from "../component/TeamsCard.jsx";
import { ParticipantCard } from "../component/participantCard.jsx";

export const TournamentDetails = () => {

    const { store, actions } = useContext(Context)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // Solo llamamos a getOneTournament cuando el Id cambia
        if (params.id) {
            actions.getOneTournament(params.id);
            actions.getTournamentParticipants(params.id)
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
                <div className="d-flex justify-content-around align-items-center">
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

                    {/* El botón de participar solo se muestra cuando el usuario es un player registrado no participante del torneo */}
                    {store.user?.player &&
                        !store.torneo?.participants?.flatMap(p => p.tournament_participant || [])
                            .some(p => p.player_id === store.player_info.id) && (
                            <button className="btn btn-primary h-25" onClick={handleSubmit}>Participar</button>
                        )
                    }

                    {/* El botón de editar solo aparece si eres el host creador del torneo */}
                    {store.host_info?.id === store.torneo?.host?.id && (
                        <Link to={`/tournament/edit/${params.id}`} className="btn btn-warning h-25">Editar</Link>
                    )}

                </div>
            </div>

            <br />

            <div className="container d-flex flex-column justify-content-center">
                {store.torneo?.participants && store.torneo.teams?.length > 0 ? (
                    store.torneo.teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))
                ) : (
                    <p className="m-3">Aun no hay equipos registrados aún.</p>
                )}

                <div>
                    {store.torneo?.participants_amount === 16 && <BracketCard16 tournament={store.torneo} />}
                    {store.torneo?.participants_amount === 8 && <BracketCard8 tournament={store.torneo} />}
                </div>

                {store.host_info?.id === store.torneo?.host?.id && (
                    <div className="container-fluid row">
                        {store.torneo?.participants?.length > 0 ? (
                            store.torneo.participants.map((participant) => (
                                <ParticipantCard
                                    key={participant.id}
                                    participant={participant}
                                    tournamentId={store.torneo.id}
                                    playerId={participant.id}
                                />
                            ))
                        ) : (
                            <p>No hay participantes registrados.</p>  // Opcional, si quieres mostrar un mensaje
                        )}
                    </div>
                )}

            </div>
        </>
    )
}
