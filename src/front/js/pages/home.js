import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<header className="hero-section">
				<h1 className="hero-title">¡Bienvenidos a Chikitin Express!</h1>
				<p className="hero-subtitle">
					Todo lo que necesitas para tus pequeños, entregado directamente a tu puerta.
				</p>
			</header>

			<section className="featured-products">
				<h2>Productos Destacados</h2>
				<div className="product-grid">
					{/* Aquí puedes mapear productos desde la API */}
					<div className="product-card">
						<img src="https://via.placeholder.com/150" alt="Producto 1" />
						<h3>Pañales Etapa 1</h3>
						<p>$20.00</p>
						<button className="btn btn-primary">Añadir al carrito</button>
					</div>
					<div className="product-card">
						<img src="https://via.placeholder.com/150" alt="Producto 2" />
						<h3>Pañales Etapa 2</h3>
						<p>$25.00</p>
						<button className="btn btn-primary">Añadir al carrito</button>
					</div>
					<div className="product-card">
						<img src="https://via.placeholder.com/150" alt="Producto 3" />
						<h3>Toallitas Húmedas</h3>
						<p>$10.00</p>
						<button className="btn btn-primary">Añadir al carrito</button>
					</div>
				</div>
			</section>

			<section className="benefits">
				<h2>¿Por qué elegirnos?</h2>
				<ul>
					<li>Suscripciones personalizadas para tus necesidades.</li>
					<li>Entrega rápida y confiable.</li>
					<li>Puntos de recompensa por cada compra.</li>
				</ul>
			</section>
		</div>
	);
};
