import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../component/leftMenuParent/Avatar.jsx";
import logo from "../../img/logo-blanco.png";
import defaultAvatar from "../../img/avatar-de-perfil.png";
import styles from "../../styles/Navbar.module.css";
import { Context } from "../store/appContext";

const NavBar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { token, userAvatar, isChatVisible, role } = store;
  // const [hasNotification, setHasNotification] = useState(false);

  // useEffect(() => {
  //   actions.getNotifications();
  // }, []);

  const handleLogout = () => {
    actions.handleLogout();
    navigate("/home");
  };

  const handleMessaging = () => {
    const dashboardPath = role === "admin" ? "/dashboard/admin" :
      role === "docente" ? "/dashboard/teacher" :
        role === "representante" ? "/dashboard/parent" :
          "/home";

    if (window.location.pathname !== dashboardPath) {
      navigate(dashboardPath);
    }
    actions.toggleChat();
  };

  return (
    <Navbar expand="lg" className={`${styles["navbar-custom"]} navbar-dark fixed-top`}>
      <Navbar.Brand as={Link} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ height: "50px" }}
          className="ms-5 ps-3"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className={`${styles["navbar-toggler"]}`} />
      <Navbar.Collapse id="basic-navbar-nav" className={`${styles.collapseCustom}`}>
        {token ? (
          <Nav className="ms-auto text-center">
            <Nav.Link >
              <i className={`${styles.campana} fas fa-bell`}></i>
            </Nav.Link>
            {/* <Nav.Link 
            onClick={() => setHasNotification(false)}>
              <i className={`${styles.campana} fas fa-bell
              ${hasNotification ? "text-warning" : "text-white"}`}
                style={{ cursor: "pointer", fontSize: "24px" }}></i>
            </Nav.Link> */}
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className={`${styles.Toggle}`}>
                <Avatar
                  src={userAvatar || defaultAvatar}
                  alt="User Avatar"
                  size={40}
                  className={`${styles["navbar-avatar"]}`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className={`${styles.ItemAvatar}`}>
                <Dropdown.Item as={Link} to={
                  role === "admin" ? "/dashboard/admin/profile" :
                    role === "docente" ? "/dashboard/teacher/profile" :
                      role === "representante" ? "/dashboard/parent/profile" :
                        "/profile"
                } className={`${styles.ItemAvatarButtom}`}>
                  Perfil
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleMessaging}
                  className={`${styles.ItemAvatarButtom}`}
                >
                  Mensajería
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} className={`${styles.ItemAvatarButtom}`}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ms-auto text-center">
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "bienvenida" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "profesorado" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Profesorado
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/home", { state: { scrollTo: "caracteristicas" } })}
              className={`${styles.NavButton} nav-link`}
            >
              Características
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={`${styles.NavButton} nav-link`}>
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
