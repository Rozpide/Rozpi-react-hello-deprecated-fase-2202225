import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import "../../styles/teamCard.css";

export const TeamCard = ({team}) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="TeamCard__card">
            <div>
                <h5 className="mb-0">Equipo {team.team_number}</h5>
                <hr className="mt-0 mb-2 mt-1"/>
            </div>
            
            <div className='mt-3'>
                <div className="d-flex mb-2">
                    <nav className="TeamCard__card--position">DER</nav><p className="mb-0">{team.left ? team.right.name : "Esperando compañero"}</p>
                </div>

                <div className="d-flex">
                    <nav className="TeamCard__card--position">ZUR</nav><p className="mb-0">{team.left ? team.left.name : "Esperando compañero"}</p>
                </div>
            </div>
        </div>
    );
};