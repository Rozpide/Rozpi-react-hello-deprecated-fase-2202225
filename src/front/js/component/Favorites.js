import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        store.favoriteIds.forEach((favorite) => {
            actions.getFavPriceData(favorite.coin_id);
            actions.getFavoriteData(favorite.coin_id);
        });
    }, []);

    return (
        <div className="row favorites-container" id="favoriteScreen">
            {store.favoriteData.length === 0 ? (
                <div className="no-favorites-message">
                    <h4>There are currently no favorites.</h4>
                    <p>Add some favorites to see them listed here!</p>
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
                                    <Link to={"/moreInfo"}>
                                        <span className="favMoreInfoButton btn">More Information</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
