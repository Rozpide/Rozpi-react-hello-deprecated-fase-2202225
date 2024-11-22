import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		// Aquí iría la lógica para autenticar al usuario
		// Una vez autenticado, redirigimos al dashboard
		navigate("/dashboard");
	};

	return (
		<div className="login-container" style={{ backgroundColor: "#FFFDC4", padding: "50px", textAlign: "center" }}>
			<h2>🌦️ App de Clima</h2>
			<h3>Iniciar Sesión</h3>
			<input type="text" placeholder="Usuario" style={{ margin: "10px", padding: "10px", width: "80%" }} />
			<input type="password" placeholder="Contraseña" style={{ margin: "10px", padding: "10px", width: "80%" }} />
			<button
				style={{
					margin: "10px",
					padding: "10px 20px",
					backgroundColor: "#007BFF",
					color: "white",
					border: "none",
					cursor: "pointer",
				}}
				onClick={handleLogin}
			>
				Entrar
			</button>
			<div style={{ marginTop: "20px" }}>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
					alt="Login con Google"
					style={{ width: "40px", cursor: "pointer" }}
				/>
			</div>
		</div>
	);
};

export default Login;

