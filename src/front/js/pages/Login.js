import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/api/login`, { email, password });
            if (response.status === 200) {
                alert("Logged in successfully!");
                navigate("/demo");
            }
        } catch (error) {
            alert("There was an error logging in.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">INGRESA-LOGIN</h2>
                    <form onSubmit={handleSubmit} className="p-4 border rounded-3 bg-sky-blue">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
