import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const TournamentForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [tournamentData, setTournamentData] = useState({
        name: '',
        inscription_fee: '',
        rating: '',
        schedule: '',
        award: '',
        type: '',
        image: '', // Aquí se guardará la URL de la imagen
        participants_amount: ''
    });

    const handleChange = e => {
        setTournamentData({
            ...tournamentData, 
            [e.target.name]: e.target.value
        });
    };

        // Función para ejecutar la entrada del acrhivo
    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            uploadImageToCloudinary(file);
        }
    };

    // Función para cargar la imagen a Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_upload_preset');

        const response = await fetch("https://api.cloudinary.com/v1_1/dpo6yzyaz/image/upload", { 
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
            setTournamentData({
                ...tournamentData,
                image: data.secure_url,  // Aquí guardamos la URL de la imagen
            });
            console.log("Imagen cargada correctamente:", data.secure_url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tournamentData.name || !tournamentData.inscription_fee || !tournamentData.rating || !tournamentData.schedule || !tournamentData.award || !tournamentData.type || !tournamentData.participants_amount) {
            console.log("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const info = await actions.postTournament(tournamentData);
        await actions.getTournaments();
        navigate('/tournaments/' + info.tournament.id);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
                <label htmlFor="name">Name</label>
                <input className="mb-2" type="text" name="name" id="name" placeholder="Enter tournament name" value={tournamentData.name} onChange={handleChange} required />
                <div className="d-flex flex-column align-items-center mb-2">
                    <label htmlFor="inscription_fee">Inscription Fee</label>
                    <div>
                        <input type="number" name="inscription_fee" id="inscription_fee" placeholder="Enter inscription fee" value={tournamentData.inscription_fee} onChange={handleChange} required />
                        <span style={{ marginLeft: "5px", fontWeight: "bold" }}>€</span>
                    </div>
                </div>
                <label htmlFor="rating">Rating</label>
                <input className="mb-2" type="number" name="rating" id="rating" placeholder="Enter tournament rating" value={tournamentData.rating} onChange={handleChange} min="1" max="5" required />
                <label htmlFor="schedule">Schedule</label>
                <input className="mb-2" type="datetime-local" name="schedule" id="schedule" value={tournamentData.schedule} onChange={handleChange} min={new Date().toISOString().slice(0, 16)} required />
                <label htmlFor="award">Award</label>
                <input className="mb-2" type="text" name="award" id="award" placeholder="Enter tournament award" value={tournamentData.award} onChange={handleChange} required />
                <label htmlFor="type">Type</label>
                <select className="mb-2" name="type" id="type" value={tournamentData.type} onChange={handleChange} required>
                    <option value="Selecciona tipo">Selecciona tipo</option>
                    <option value="Cuartos de final">Cuartos de final</option>
                </select>
                <label htmlFor="participants_amount">Participants amount</label>
                <select className="mb-2" name="participants_amount" id="participants_amount" value={tournamentData.participants_amount} onChange={handleChange} required>
                    <option value="Selecciona nº de participantes">Selecciona nº</option>
                    <option value="16">16</option>
                </select>
                <label htmlFor="image">Image</label>
                <input className="mb-2" type="file" name="image" id="image" onChange={handleFileChange} />
            </div>
            <div>
                <button className="btn btn-primary mt-2" type="submit"><strong>Create</strong></button>
            </div>
        </form>
    );
};