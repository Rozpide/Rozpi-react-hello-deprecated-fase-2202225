import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import User from "./pages/user"; 
import PredefinedTasks from "./component/PredefinedTasks"; 
import Register from "./pages/Register"; 
import Login from "./pages/Login";
import UpdateUser from "./pages/UpdateUser";  // Importa el componente UpdateUser
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<User />} path="/admin/user" /> 
                        <Route element={<PredefinedTasks />} path="/admin/task" /> 
                        <Route element={<Register />} path="/register" /> 
                        <Route element={<Login />} path="/login" /> 
                        <Route element={<UpdateUser />} path="/update-user" />  {/* Ruta para el componente UpdateUser */}
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
