import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>

			{/* Contenido principal */}
			<div
				className="d-flex justify-content-center align-items-center"
				style={{
					height: "90vh",
					background: "linear-gradient(to bottom right, #FCECCF, #FDF4E6)",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{/* Figuras decorativas */}
				<div
					style={{
						position: "absolute",
						width: "200px",
						height: "200px",
						backgroundColor: "#FDC968",
						borderRadius: "50%",
						top: "10%",
						left: "20%",
						zIndex: 1,
					}}
				></div>
				<div
					style={{
						position: "absolute",
						width: "300px",
						height: "300px",
						backgroundColor: "#002B5B",
						borderRadius: "50%",
						bottom: "20%",
						right: "10%",
						zIndex: 1,
					}}
				></div>
				<div
					style={{
						position: "absolute",
						width: "100px",
						height: "100px",
						backgroundColor: "#FDC968",
						borderRadius: "50%",
						bottom: "30%",
						right: "30%",
						zIndex: 1,
					}}
				></div>
				<div
					style={{
						position: "absolute",
						width: "80px",
						height: "80px",
						backgroundColor: "#FDC968",
						borderRadius: "50%",
						top: "40%",
						left: "15%",
						zIndex: 1,
					}}
				></div>

				{/* Contenido textual */}
				<div className="container text-center z-3" >
					<h1 className=" adlam-display-regular display-5 fw-bold text-dark mb-3">
						Una ayuda para encontrar mascotas perdidas en tu zona.
					</h1>
					<p className="text-muted fs-5 mb-4">
						Encuentra a tu mascota o ayuda a otra persona a encontrarla. Miles
						de historias felices nos respaldan.
					</p>
					<div className="d-flex justify-content-center gap-3">
						<button className="btn btn-danger btn-lg">Perdí a mi mascota</button>
						<button className="btn btn-success btn-lg">Encontré una mascota</button>
					</div>
				</div>
			</div>
		</div>
	);
};
