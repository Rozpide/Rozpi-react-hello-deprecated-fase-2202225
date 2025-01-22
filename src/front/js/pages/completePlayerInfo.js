import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import {PlayerCard} from "../component/playerCard.jsx";

export const CompletePlayerInfo = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Completa tu Perfil</h1>
            <PlayerCard use={'completePlayer'}/>
        </div>
    );
};