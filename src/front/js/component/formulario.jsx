import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const Formulario = ({ type }) => {
    console.log("Formulario type:", type);
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        gender: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!formData.email || !formData.password) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", formData, "type:", type);

        if (type === 'login') {
            actions.login(formData);
        } else {
            actions.register(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {type !== 'login' && (
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre Completo"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Teléfono</label>
                        <PhoneInput
                            country={'es'}
                            value={formData.phoneNumber}
                            onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Género</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Selecciona un género
                            </option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>

                </>
            )}
            <div>
                <input
                    type="submit"
                    value={type === 'login' ? 'Iniciar sesión' : 'Registrarse'}
                />
            </div>
        </form>
    );
};
