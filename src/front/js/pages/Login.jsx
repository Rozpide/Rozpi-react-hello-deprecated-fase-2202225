import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import JourNaviLogo from "../../img/JourNavi Logo.png";
import JourNaviLogoDark from "../../img/JourNavi Logo Dark Mode.png";
import { useNavigate } from "react-router-dom";


export const Login = ({ dark, setDark }) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password };
        const success = await actions.login(dataToSend);
        if (success) {
            alert(`Welcome, ${store.user.name ? store.user.name : store.user.email}`);
            navigate('/');
        } else {
            setErrorMessage(store.message)
        }
    }

    return (
        <div className="form-signin w-25 align-items-center m-auto">
            <form onSubmit={handleSubmit}>
                <img className="mb-4 mx-auto d-block" src={dark ? JourNaviLogoDark : JourNaviLogo} alt="" width="80" height="80" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    <label className={dark ? 'text-dark' : ''} htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type={visible ? 'text' : 'password'} className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <label className={dark ? 'text-dark' : ''} htmlFor="floatingPassword">Password</label>
                    <div style={{ position: 'relative', left: '90%', transform: 'translateY(-170%)', color: '#FE5558', cursor: 'pointer' }} onClick={() => setVisible(!visible)}>
                        {visible ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                    </div>
                </div>
                <button className={dark ? "btn btn-pink w-100 py-2" : "btn btn-dark w-100 py-2"} type="submit">Sign in</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}
