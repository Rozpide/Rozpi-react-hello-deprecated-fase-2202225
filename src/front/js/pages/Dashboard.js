import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Dashboard = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <h2>Bienvenido, {store.user ? store.user.name : "Usuario"}</h2>
            <button className="btn btn-danger" onClick={actions.logout}>Cerrar sesión</button>
        </div>
    );
};

export default Dashboard;
