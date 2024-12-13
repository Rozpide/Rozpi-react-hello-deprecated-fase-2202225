import React, { useState, useEffect, useContext } from "react";
import NavBar from "../component/Navbar.js";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/components.css";
import Swal from 'sweetalert2';

export const UpdateTeacher = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <NavBar />
            <div className="row">
                <div className="col mt-5">
                    <h1>Update Teacher</h1>
                </div>
            </div>
        </div>
    );
};

export default UpdateTeacher;