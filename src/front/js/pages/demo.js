import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleUpdateUser = () => {
        navigate("/update-user");
    };

    return (
        <div className="container">
            <ul className="list-group">
                {store.demo.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between"
                            style={{ background: item.background }}>
                            <Link to={"/single/" + index}>
                                <span>Link to: {item.title}</span>
                            </Link>
                            {// Conditional render example
                            // Check to see if the background is orange, if so, display the message
                            item.background === "orange" ? (
                                <p style={{ color: item.initial }}>
                                    Check store/flux.js scroll to the actions to see the code
                                </p>
                            ) : null}
                            <button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
                                CAMBIO COLOR PRIVADO
                            </button>
                        </li>
                    );
                })}
            </ul>
            <br />
            <Link to="/admin/task">
                <button className="btn btn-primary">OTRA ZONA PRIVADA</button>
            </Link>
            <br />
            <button className="btn btn-primary mt-3" onClick={handleUpdateUser}>Actualizar Información del Usuario</button>
        </div>
    );
};

