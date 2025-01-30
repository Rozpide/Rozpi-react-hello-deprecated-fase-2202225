import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/bracketsCard.css";
import { BracketsCard } from "../component/bracketsCard.jsx";


export const Pruebas = () => {
    const { store, actions } = useContext(Context);

    return(
        <div className="container">
            <p>BRACKETS PRUEBA</p>
            <BracketsCard/>
        </div>
    );
};