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

    const handleCancel = e => {
        resetInputData();
        navigate('/host/profile');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log("Submit data:", hostData, "viewMode:", viewMode);

        if (viewMode === 'host') {
            await actions.hostPage(hostData);
        } else {
            await actions.updateHost(hostData);
        }

        resetInputData();

        navigate('/host/profile');
    };

    const resetInputData = () => {
        setHostData({
            name: '',
            address: '',
            phone: '',
            court_type: ''
        });
    }

    return (
        <>
            {viewMode === 'hostPage' ? (
                <div className="card-body">
                    <p className="card-text"><b>name:</b> {hostData.name || ''} </p>
                    <p className="card-text"><b>address:</b> {hostData.address || ''} </p>
                    <p className="card-text"><b>phone:</b> {hostData.phone || ''} </p>
                    <p className="card-text"><b>court_type:</b> {hostData.court_type || ''} </p>

                    <Link to="/host/editProfile">
                        <button type="button" className="btn btn-primary">Editar Perfil</button>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="text" className="hostProfile__input" value={hostData.name} onChange={handleChange} placeholder="name" name="name" />
                    <input type="text" className="hostProfile__input" value={hostData.address} onChange={handleChange} placeholder="address" name="address" />
                    <input type="number" className="hostProfile__input" value={hostData.phone} onChange={handleChange} placeholder="phone" name="phone" />
                    <input type="text" className="hostProfile__input" value={hostData.court_type} onChange={handleChange} placeholder="court type" name="court_type" />

                    <input className="btn btn-success" type="submit" value="Enviar" />
                    <button className="btn btn-danger" value="Cancelar" onClick={handleCancel}>Cancelar</button>
                </form>
            )}
        </>
    );
};