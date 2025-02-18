import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        const success = await actions.signup(email, password);
        if (success) {
            setShowModal(false); // Cierra el modal
            navigate("/login");  // Redirige al login
        } else {
            alert("Error en el registro");
        }
    };

    return (
        <div>
            {/* activa el modal */}
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Signup</button>

            {/*  Bootstrap */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Regístrate</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSignup}>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="form-control mb-2" />
                                    <button type="submit" className="btn btn-success">Registrarse</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Signup;
