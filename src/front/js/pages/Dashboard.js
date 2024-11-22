import React from "react";
import Navbar from "../component/navbar";
import Clima from "../component/Clima";
import Formulario from "../component/Formulario";
import Footer from "../component/Footer";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Clima />
                <Formulario />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
