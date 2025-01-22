import React, {useContext,useState} from 'react';
import { Context } from "../store/appContext";

export const PlayerCard = ({use}) => {
    console.log("PlayerCard use:", use);
    const { store, actions } = useContext(Context);
    
    const [playerData, setPlayerData] = useState({
        name:'',
        gender:'',
        age:'',
        rating:'',
        side:'',
        hand:'',
    });

    const handleChange = (e) => {
        setPlayerData({
            ...playerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!playerData.name || !playerData.gender || !playerData.age || !playerData.rating || !playerData.side || !playerData.hand) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", playerData, "use:", use);
        
        use === 'player' ? actions.playerPage(playerData) : actions.updatePlayer(playerData);
    };

    return (
        <>
        {use === 'playerPage' ? (
            <div className="card" style={{ width: "18rem" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{playerData.name}</h5>
                    <p className="card-text">Género: {playerData.gender}</p>
                    <p className="card-text">Edad: {playerData.age}</p>
                    <p className="card-text">Categoría: {playerData.rating}</p>
                    <p className="card-text">Lado: {playerData.side}</p>
                    <p className="card-text">Mano: {playerData.hand}</p>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        value={playerData.name}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div className="m-3">
                        <label htmlFor="gender">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            value={playerData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un género</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Otro">Otro</option>
                        </select>
                </div>
                <div className="m-3">
                    <label htmlFor="age">Edad</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Edad"
                        value={playerData.age}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div className="m-3">
                    <label htmlFor="rating">Categoría</label>
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        placeholder="Categoría"
                        value={playerData.rating}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div className="m-3">
                        <label htmlFor="side">Lado</label>
                        <select
                            id="side"
                            name="side"
                            value={playerData.side}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un lado</option>
                            <option value="Izquierdo">Drive</option>
                            <option value="Derecho">Revés</option>
                            <option value="Derecho">Cualquiera</option>
                        </select>
                    </div>
                    <div className="m-3">
                        <label htmlFor="hand">Mano</label>
                        <select
                            id="hand"
                            name="hand"
                            value={playerData.hand}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una mano</option>
                            <option value="Diestro">Diestro</option>
                            <option value="Zurdo">Zurdo</option>
                        </select>
                    </div>
                <div>
                    <input type="submit" value={'Actualizar datos'} />
                </div>
            </form>
        )}
        </>
        
    );
};
