import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="bg-light w-50 pt-2">
            <Formulario type={'login'}/>
            <p className="fw-bold mt-5 mb-0">¿Aún no tienes tu cuenta?</p>
            <Link to="/signup">
                <button className="btn text-warning text-decoration-underline p-0 pb-2">Crea la tuya aquí</button>
            </Link>
        </div>
    );
};
