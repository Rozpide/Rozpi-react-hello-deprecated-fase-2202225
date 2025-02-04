import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';


export const PlayerCard = ({ use }) => {
    console.log("PlayerCard use:", use);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [playerData, setPlayerData] = useState({
        name: store.player_info?.name || '',
        gender: store.player_info?.gender || '',
        age: store.player_info?.age || '',
        rating: store.player_info?.rating || '',
        side: store.player_info?.side || '',
        hand: store.player_info?.hand || '',
        phone: store.player_info?.phone || '',
    });

    const handleChange = (e) => {
        setPlayerData({
            ...playerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!playerData.name || !playerData.gender || !playerData.age || !playerData.rating || !playerData.side || !playerData.hand) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", playerData, "use:", use);

        if (use === 'player') {
            await actions.playerPage(playerData);
        } else {
            await actions.updatePlayer(playerData);
        }

        navigate('/player/profile');
    };

    const handleCancel = e => {
        navigate('/player/profile');
    };

    return (
        <>
            {use === 'playerPage' ? (
                <div className="d-flex justify-content-center  bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card mt-5" style={{ width: "25rem", height: "20rem", minHeight: "15rem", minWidth: "20rem" }}>
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase">{playerData.name || ''}</h5>
                            <p className="card-text"><b>Género:</b> {playerData.gender || ''}</p>
                            <p className="card-text"><b>Edad:</b> {playerData.age}</p>
                            <p className="card-text"><b>Categoría:</b> {playerData.rating}</p>
                            <p className="card-text"><b>Lado:</b> {playerData.side}</p>
                            <p className="card-text"><b>Mano:</b> {playerData.hand}</p>
                            <p className="card-text"><b>Phone:</b> {playerData.phone}</p>
                        </div>

                        <Link to="/player/editProfile" className='text-center p-2'>
                            <button type="button" className="btn btn-primary">Editar Perfil</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center  bg-light" style={{ minHeight: "100vh" }}>
                    <div className="card mt-5" style={{ width: "30rem", height: "45rem", minHeight: "45rem", minWidth: "30rem" }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="name"><b>Nombre</b></label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        value={playerData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="gender"><b>Género</b></label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={playerData.gender}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Selecciona un género</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="age"><b>Edad</b></label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        placeholder="Edad"
                                        value={playerData.age}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="99"
                                        className="form-control"
                                    />
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="rating"><b>Categoría</b></label>
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={playerData.rating}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Selecciona tu categoría</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="side"><b>Lado</b></label>
                                    <select
                                        id="side"
                                        name="side"
                                        value={playerData.side}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Selecciona un lado</option>
                                        <option value="Izquierdo">Drive</option>
                                        <option value="Derecho">Revés</option>
                                        <option value="Derecho">Cualquiera</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="hand"><b>Mano</b></label>
                                    <select
                                        id="hand"
                                        name="hand"
                                        value={playerData.hand}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Selecciona una mano</option>
                                        <option value="Diestro">Diestro</option>
                                        <option value="Zurdo">Zurdo</option>
                                    </select>
                                </div>
                                <div className="m-3">
                                    <label className='mb-1' htmlFor="phone"><b>Teléfono</b></label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Número de teléfono"
                                        value={playerData.phone}
                                        onChange={handleChange}
                                        required
                                        pattern="[0-9]{9}"
                                        className="form-control"
                                    />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <input type="submit" value={'Actualizar datos'} className="btn btn-primary m-2" />
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
