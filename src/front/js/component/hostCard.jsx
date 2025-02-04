import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';

export const HostCard = ({ viewMode }) => {  // Cambié 'use' por 'viewMode'
    console.log("HostCard viewMode:", viewMode);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [hostData, setHostData] = useState({
        name: store.host_info?.name || '',
        address: store.host_info?.address || '',
        phone: store.host_info?.phone || '',
        court_type: store.host_info?.court_type || '',
    });

    const handleChange = e => {
        setHostData({
            ...hostData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submit data:", hostData, "viewMode:", viewMode);

        if (viewMode === 'host') {
            await actions.hostPage(hostData);
        } else {
            await actions.updateHost(hostData);
        }

        navigate('/host/profile');
    };

    const handleCancel = e => {
        navigate('/host/profile');
    };

    return (
        <>
            {viewMode === 'hostPage' ? (

                <div className="d-flex justify-content-center  bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card mt-5" style={{ width: "25rem", height: "15rem", minHeight: "15rem", minWidth: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase">{hostData.name || ''}</h5>
                            <p className="card-text"><b>Dirección Postal:</b> {hostData.address || ''}</p>
                            <p className="card-text"><b>Phone:</b> {hostData.phone || ''} </p>
                            <p className="card-text"><b>Tipo de Club:</b> {hostData.court_type || ''}</p>

                        </div>

                        <Link to="/host/editProfile" className='text-center p-2'>
                            <button type="button" className="btn btn-primary">Editar Perfil</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card mt-5" style={{ width: "30rem", height: "27rem", minHeight: "27rem", minWidth: "30rem" }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="name"><b>Nombre</b></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        value={hostData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="address"><b>Dirección</b></label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Dirección"
                                        value={hostData.address}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="phone"><b>Teléfono</b></label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        placeholder="Teléfono"
                                        value={hostData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="court_type"><b>Tipo de cancha</b></label>
                                    <select
                                        id="court_type"
                                        name="court_type"
                                        value={hostData.court_type}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Selecciona un tipo de cancha</option>
                                        <option value="Indoor">Indoor</option>
                                        <option value="Outdoor">Outdoor</option>
                                    </select>

                                </div>
                                <div className='d-flex justify-content-center'>
                                    <input type="submit" value={'Enviar'} className="btn btn-primary m-2" />
                                    <button className="btn btn-danger m-2" value="Cancelar" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};




