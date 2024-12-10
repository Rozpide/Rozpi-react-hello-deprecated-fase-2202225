import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        store.favoriteIds.forEach((favorite) => {
            actions.getFavPriceData(favorite.coin_id);
            actions.getFavoriteData(favorite.coin_id);
        });
    }, []);

    const handleFavoriteToggle = (coin) => {

        const existingFav = store.favoriteIds.find((favCoin) => favCoin.coin_id === coin.id);
        if (existingFav) {
            actions.setFavoriteData();
            actions.setFavoritePriceData();
            actions.removeFromFavs(existingFav.id);

        }

    };

    return (
        <div className="row" id="favoriteScreen">
            {store.favoriteData.length === 0 ? (
                <div className="favorites-container">
                    <div className="no-favorites-message">
                        <h4>There are currently no favorites.</h4>
                        <p>Add some favorites to see them listed here!</p>
                    </div>
                </div>

            ) : (
                store.favoriteData.map((favorite, index) => {
                    const chartdata = store.favoritePriceData.filter((array) => {
                        if (array[0].id === favorite.id) return array;
                    });
                    return (
                        <div className="favCardOut card col-4" key={index}>
                            <div className="favCardIn">
                                <div className="favCardTop card-img-top">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartdata[0]}>
                                            <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                            <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                            <XAxis dataKey="date" tick={null} />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="favCardBody card-body">
                                    <h5 className="card-title">{favorite.name}</h5>
                                    <p className="card-text">{favorite.symbol}</p>
                                    <p className="card-text"><strong>Current Price:</strong> ${favorite.current_price}</p>
                                    <div className="button-group">
                                        <Link to={"/moreInfo/" + favorite.id}>
                                            <span className="favMoreInfoButton btn">More Information</span>
                                        </Link>
                                        <button
                                            className="remove-btn btn btn-danger"
                                            onClick={() => handleFavoriteToggle(favorite)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
