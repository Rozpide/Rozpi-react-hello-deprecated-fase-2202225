import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<section
				className="section home__section-1 position-relative vh-50 d-flex align-items-center justify-content-center"
				style={{backgroundImage: `url(${process.env.BACKEND_URL + "/padel-court.jpg"})`}}
			>
				<div className="position-absolute bottom-0 start-50 translate-middle-x text-center w-100 mb-5 ">
					<h1>¿Qué es PadelZone?</h1>
					<p className="mt-3">
						La plataforma perfecta para organizar y participar en eventos deportivos, diseñada para la creación y organización de torneos
					</p>
				</div>
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
