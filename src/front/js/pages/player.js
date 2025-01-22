import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import {PlayerCard} from "../component/playerCard.jsx";

export const Player = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <h1>Player</h1>
            <PlayerCard />
        </div>
    );
};
