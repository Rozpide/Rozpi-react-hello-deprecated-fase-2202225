import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../../styles/components.css";
import Avatar from "./leftMenuParent/Avatar.jsx";
import { Spinner } from "react-bootstrap";
let Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  background-image: linear-gradient(
    to right,
    rgba(31, 118, 146, 0.8),
    rgba(67, 56, 135, 0.8)
  );
  color: white;
  font-weight: bold;
  border-radius: 30px;
`;

let StyledInput = styled.input`
  border-radius: 50px;
`;

const StyledImg = styled.img`
  border: 2px solid #ffffff;
  padding: 0.5rem;
  border-radius: 2rem;
  opacity: 1;
`;

const StyledFileInput = styled.input`
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #e1e1e1;
    color: rgb(0, 0, 0);
  }
`;

const ProfileForm = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [picturePreview, setPicturePreview] = useState(null);

  const handlePasswordChange = async () => {
    const { value: password } = await Swal.fire({
      title: "Ingresa tu contraseña",
      showCancelButton: true,
      confirmButtonText: "Siguiente",
      cancelButtonText: "Cancelar",
      icon: "question",
      input: "password",
      inputLabel: "Contraseña",
      inputPlaceholder: "Ingresa tu nueva Contraseña",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
    });
    if (!password) {
      return;
    }
    const { value: passwordConfirm } = await Swal.fire({
      title: "Confirma tu contraseña",
      showCancelButton: true,
      confirmButtonText: "Cambiar Contraseña",
      cancelButtonText: "Cancelar",
      icon: "question",
      input: "password",
      inputLabel: "Confirmar contraseña",
      inputPlaceholder: "Confirma tu contraseña",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
    });
    if (password != passwordConfirm) {
      Swal.fire({
        title: "Contraseña de confirmacion Incorrecta",
        icon: "error",
      });
    }
  };

  const handleChange = e => {
    let StyledInput = e.currentTarget;
    setUserData({ ...userData, [StyledInput.name]: StyledInput.value });
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      let newData = { ...user };
      delete newData.estudiantes;
      delete newData.calendario;
      delete newData.statusResume;
      delete newData.foto;
      setUserData(newData);
    }
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userData);
  };

  const handleUploadPhoto = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return user ? (
    <Container className="container-fluid">
      <div className="row ">
        <div className="col-md-3 col-sm-auto text-center">
          <Avatar
            src={"https://placehold.co/400"}
            alt={""}
            size={150}
            className="mb-0"
          />
        </div>
        <div className="col-3">
          <label className="form-label text-form">Subir foto:</label>
          <StyledFileInput
            type="file"
            accept="image/*"
            className="form-control select-image rounded-pill"
            onChange={handleUploadPhoto}
            required
          />
        </div>

        {picturePreview && (
          <div className="z-3 position-absolute p-5 rounded-3 ">
            <StyledImg
              src={picturePreview}
              alt="Preview"
              className="mt-2 teacher-photo float-right"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
      </div>

      <div className="row">
        <div className="d-flex gap-2 jusitfy-content-center align-items-center">
          <i className="bi bi-person-circle fs-3"></i>
          <h3 className="m-0">Informacion Personal </h3>
        </div>
        <hr className="dropdown-divider mt-2" />
      </div>

      <form onSubmit={e => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <StyledInput
              type="text"
              name="nombre"
              className="form-control"
              value={userData.nombre || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <StyledInput
              type="text"
              name="apellido"
              className="form-control"
              value={userData.apellido || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="email" className="form-label">
              Correo Electronico
            </label>
            <StyledInput
              type="email"
              name="email"
              className="form-control"
              value={userData.email || ""}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="telefono" className="form-label">
              Telefono
            </label>
            <StyledInput
              type="tel"
              name="telefono"
              className="form-control"
              value={userData.telefono || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-6 col-sm-auto m-2">
            <label htmlFor="telefono" className="form-label">
              Direccion
            </label>
            <StyledInput
              type="textarea"
              name="direccion"
              className="form-control"
              value={userData.direccion || ""}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="d-flex gap-2 jusitfy-content-center align-items-center">
            <i className="bi bi-file-lock-fill fs-3"></i>
            <h3 className="m-0">Privacidad </h3>
          </div>
          <hr className="dropdown-divider mt-2" />
        </div>
        <div className="row">
          <div className="col-auto">
            <label htmlFor="telefono" className="form-label">
              Contraseña
            </label>
            <StyledInput
              type="password"
              placeholder="***********"
              name="password"
              className="form-control"
              disabled
            />
          </div>
          <div className="col-auto mt-auto">
            <button
              type="button"
              className="btn btn-outline-register"
              onClick={() => handlePasswordChange()}>
              <i className="bi bi-key-fill"></i> Cambiar Contraseña
            </button>
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col-auto ms-auto">
            <button type="submit" className="btn btn-success text-end">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </Container>
  ) : (
    <div className="container-fluid d-flex justify-content-center h-100 align-items-center">
      <Spinner animation="border" />
    </div>
  );
};

export default ProfileForm;
