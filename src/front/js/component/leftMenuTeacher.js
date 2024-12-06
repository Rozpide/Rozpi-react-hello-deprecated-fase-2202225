import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import imgWelcome from "../../img/wellcomeicon.png"
import "../../styles/components.css";
import Swal from 'sweetalert2';

const FormCommon = ({ type }) => {
    const { store, actions } = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [grades, setGrades] = useState({});
    const [formBody, setFormBody] = useState({
        name: '',
        description: '',
        date: '',
        status: '',
        grade: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            await actions.getTeacherInfo();
            console.log('Fetched teacher info:', store.profesorPersonalInfo);
        };
        fetchData();
    }, []);

    const handleChange = (e, studentId) => {
        const { name, value } = e.target;
        setFormBody(prevState => ({ ...prevState, [name]: value }));
        if (name.startsWith('grade-')) {
            setGrades(prevGrades => ({
                ...prevGrades,
                [studentId]: value
            }))
        }

        if (name === 'grado_id') {
            setSelectedCourse(value);
            setSelectedSubject('');
            setFormBody(prevState => ({ ...prevState, materia_id: '' }));
        }
        if (name === 'materia_id') {
            setSelectedSubject(value);
        }
    };

    useEffect(() => {
        if (type === 'calificar') {
            actions.setTests();
            console.log('Selected Course:', selectedCourse);
            if (selectedCourse) {
                actions.setGradeStudents(selectedCourse);
            }
        }
    }, [type, selectedCourse]);

    const handleDateChange = (date) => {
        setStartDate(date);
        setFormBody(prevState => ({ ...prevState, date: date ? date.toISOString().split('T')[0] : '' }));
    };

    const submitFormData = async (event) => {
        event.preventDefault();

        try {
            if (type === 'crear') {
                await actions.testsOperations('POST', {
                    nombre: formBody.name,
                    descripcion: formBody.description,
                    "materia_id": formBody.materia_id,
                    fecha: formBody.date,
                    finalizada: formBody.status === 'finalizada'
                })
            }
            if (type === 'calificar') {
                const estudiantes_notas = store.estudiantes.map(student => ({
                    estudiante_id: parseInt(student.id, 10),
                    nota: parseFloat(grades[student.id]) || 0
                }));
                await actions.scoreOperations('POST', {
                    "materia_id": parseInt(formBody.materia_id, 10),
                    "evaluacion_id": parseInt(formBody.evaluacion_id, 10),
                    "estudiantes_notas": estudiantes_notas
                })
            }
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormBody({
                name: '',
                description: '',
                date: '',
                status: '',
                grade: '',
                evaluacion_id: '',
                materia_id: ''
            });
            setGrades({});
            setStartDate(new Date());
        } catch (error) {
            console.error("Error submitting data", error)
            Swal.fire({
                title: "Error al registrar los datos",
                icon: "error"
            });
        }
    };

    const filteredEvaluaciones = store.evaluaciones.filter(
        evaluacion => evaluacion.materia.id === parseInt(selectedSubject)
    );

    return (
        <div className="container ms-2">

            <form onSubmit={(e) => submitFormData(e)} className="container-welcome-teacher">
                <h4 className="text-title d-flex justify-content-center mb-4">{`${type === 'crear' ? 'Crear' : 'Calificar'} evaluación`}</h4>

                {/* Formulario para crear evaluaciones */}

                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-form">Nombre:</label>
                    <input type="text" name="name" className="form-control rounded-pill" required value={formBody.name} onChange={handleChange} />
                </div>}
                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Descripción:</label>
                        <textarea type="text" name="description" rows="3" className="form-control teacher-description" required value={formBody.description} onChange={handleChange}></textarea>

                    </div>
                )}
                {type === 'crear' && <div className="mb-3">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <label className="form-label text-form">Elige el curso:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill"
                                    name="grado_id"
                                    id="inputGroupSelect04"
                                    onChange={handleChange}>

                                    <option value="" disabled selected>Opciones...</option>

                                    {store.profesorPersonalInfo.grados.map(grado =>
                                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex flex-column">
                            <label className="form-label text-form">Elige la materia:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill"
                                    name="materia_id"
                                    id="inputGroupSelect04"
                                    onChange={handleChange}
                                    disabled={!selectedCourse}>

                                    <option value="" disabled selected>Opciones...</option>

                                    {store.profesorPersonalInfo.materias
                                        .filter(materia => materia.grado.id === parseInt(selectedCourse))
                                        .map(materia =>
                                            <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>}

                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-form">Fecha de evaluación:</label> <br></br>
                    <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                </div>}

                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form me-3">Estado:</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="active" value="pendiente" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="active">Pendiente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="finished" value="finalizada" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="finished">Finalizada</label>
                        </div>
                    </div>
                )}

                {/* Formulario para calificar las evaluaciones */}

                {type === 'calificar' && (
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <label className="form-label text-form">Elige el curso:</label>
                            <div className="input-group" required>
                                <select
                                    className="custom-select rounded-pill"
                                    name="grado_id"
                                    id="inputGroupSelect04"
                                    required
                                    onChange={handleChange}>

                                    <option value="" disabled selected>Opciones...</option>

                                    {store.profesorPersonalInfo.grados.map(grado =>
                                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3 me-5">
                            <label className="form-label text-form">Elige una materia:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select
                                    className="custom-select rounded-pill"
                                    name="materia_id"
                                    required
                                    disabled={!selectedCourse}
                                    id="inputGroupSelect04">
                                    <option selected>Materia...</option>
                                    {store.profesorPersonalInfo.materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-form">Selecciona una evaluación:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select
                                    className="custom-select rounded-pill"
                                    name="evaluacion_id"
                                    id="inputGroupSelect04"
                                    required
                                    disabled={!selectedSubject}>
                                    <option selected>Pendientes...</option>
                                    {filteredEvaluaciones.map(evaluacion =>
                                        <option key={evaluacion.id} value={evaluacion.id}>{evaluacion.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                    </div>
                )}
                {type === 'calificar' && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.estudiantes.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.nombre}</td>
                                    <td>{student.apellido}</td>
                                    <td>
                                        <input
                                            required
                                            type="number"
                                            name={`grade-${student.id}`}
                                            className="form-control"
                                            value={grades[student.id] || ''}
                                            onChange={(e) => handleChange(e, student.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button type="submit" className="btn btn-outline-register">Registrar</button>
            </form>
        </div>
    );
};

export const LeftMenuTeacher = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleCreateEvaluation = () => {
        setActiveContent("crear");
    };

    const handleGradeEvaluation = () => {
        setActiveContent("calificar");
    };

    const renderContent = () => {
        switch (activeContent) {
            case "crear":
                return <FormCommon type="crear" />;
            case "calificar":
                return <FormCommon type="calificar" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent mt-3">
                        <div className="container-welcome-teacher d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Siempre es un gusto tenerte de vuelta!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para ingresar o editar la información de los estudiantes.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="mt-0">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 left-menu-background rounded-start">
                    <div className="d-flex flex-column align-items-center align-items-sm-start mt-5 px-3 pt-4 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills list-group flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="list-menu-item">
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-card-checklist"></i>
                                    <span className="ms-1 d-none d-sm-inline">Pruebas</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100 list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleCreateEvaluation}>
                                            <i className="fs-4 bi-file-earmark-plus"></i>
                                            <span className="ms-2 d-none d-sm-inline" >Crear</span>
                                        </Link>
                                    </li>
                                    <li className="list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleGradeEvaluation}>
                                            <i className="fs-4 bi-file-earmark-check"></i>
                                            <span className="ms-2 d-none d-sm-inline" >Calificar</span>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                            <li className="list-menu-item">
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Editar</span>
                                </Link>
                            </li>
                            <li className="list-menu-item">
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-calendar2-date"></i>
                                    <span className="ms-1 d-none d-sm-inline">Eventos</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100 list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline ">Reuniones</span>
                                        </Link>
                                    </li>
                                    <li className="list-menu-item">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline ">Salidas</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="list-menu-item">
                                <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-chat-left-text"></i>
                                    <span className="ms-1 d-none d-sm-inline ">Chat</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="d-flex justify-content-center render-content col mt-3 py-3"
                    style={{ backgroundImage: `url(${backgroundForViews})` }}>
                    <div className="welcome-message mt-5">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

