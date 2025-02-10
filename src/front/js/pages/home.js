import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import { GameList } from "../component/GameList";
import "../../styles/home.css";

export const Home = () => {
    const { store } = useContext(Context);

    return (
        <div className="home-container">
            <Carousel title="Top most popular PC games" games={store.videogames} />
            <Carousel title="New games" games={store.videogames} />
            <GameList />
        </div>
    );
};
