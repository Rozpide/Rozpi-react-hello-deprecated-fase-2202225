import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Formulario } from "../component/formulario.jsx";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	console.log(store.user);
	return (
		<div className="container mt-5">
  <div className="row position-relative">
    {/* Columna para el formulario */}
    <div className="col-md-6 d-flex justify-content-center align-items-center position-relative order-md-1 order-2">
      {/* Fondo de la imagen en pantallas pequeñas */}
      <div 
        className="d-md-none w-100 h-100 position-absolute"
        style={{
          backgroundImage: `url(${process.env.BACKEND_URL + "/foto-signup.png"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1, // Coloca la imagen detrás del formulario
          top: 0,
          left: 0,
        }}
      ></div>

      {/* Formulario */}
      <div className="bg-light w-50 pt-2 pb-3 m-5 formulario__login--bg position-relative z-index-2">
        <Formulario type="register" />
      </div>
    </div>

    {/* Columna con la imagen en pantallas grandes */}
    <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative order-md-2 order-1">
      <img 
        src={process.env.BACKEND_URL + "/foto-signup.png"}
        alt="Imagen de Registro" 
        className="img-fluid w-100 h-100"
        style={{
          objectFit: 'cover',  // Asegura que la imagen cubra toda la columna
          maxHeight: "400px",  // Mantén el límite de altura
        }} 
      />
    </div>
  </div>
</div>

	);
};

