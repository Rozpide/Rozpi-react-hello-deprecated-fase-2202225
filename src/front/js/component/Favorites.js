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
            {store.favoriteData.map((favorite, index) => {
                const chartdata = store.favoritePriceData.filter((array) => {
                    return array[0].id === favorite.id;
                });
    
                return (
                    <div key={favorite.id} className="favCardOut card col-4"> {/* style={{ width: "20vw"}} */}
                        <div className="favCardIn">
                            <div className="favCardTop card-img-top">
                                {/* <SparklineChart data={favorite.sparkline_in_7d.price} width={300} height={150} /> */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartdata[0]}>
                                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                        <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                        <XAxis dataKey="date" />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="favCardBody card-body">
                                <h5 className="card-title">{favorite.name}</h5>
                                <p className="card-text">{favorite.symbol}</p>
                                <p className="card-text"><strong>Current Price:</strong> ${favorite.current_price}</p>
                                <Link to={"/moreInfo/" + favorite.id}>
                                    <span className="favMoreInfoButton btn">More Information</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}