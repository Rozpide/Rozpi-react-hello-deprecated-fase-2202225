import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<section className="section home__section-1 " style={{ backgroundImage: `url(${process.env.BACKEND_URL + "/padel-court.jpg"})` }}>
				<h1>Sección 1</h1>
				<p>Contenido de la primera sección.</p>
			</section>
			<section className="section section-2">
				<h1>Sección 2</h1>
				<p>Contenido de la segunda sección.</p>
			</section>
			<section className="section section-3">
				<h1>Sección 3</h1>
				<p>Contenido de la tercera sección.</p>
			</section>
		</div>
	);
};
