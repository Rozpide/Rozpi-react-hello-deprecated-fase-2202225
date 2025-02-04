import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import {PlayerCard} from "../component/playerCard.jsx";

export const Player = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="mt-5 mx-5">
            <h1>Perfil</h1>
            <hr className="mb-0"></hr>
            <PlayerCard use={'playerPage'}/>
        </div>
    );
};
