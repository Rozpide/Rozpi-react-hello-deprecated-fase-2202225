//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { GameDetails } from './component/GameDetails';
import { GameSearchList } from './pages/gameSearchList';
import { GameList } from './component/GameList';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/allgames" element={<GameSearchList />} />
            </Routes>
        </Router>
    );
}

export default App;
