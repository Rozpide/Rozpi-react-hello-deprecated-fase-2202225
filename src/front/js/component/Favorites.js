import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
        <div className="row" id="favoriteScreen">
            {store.favoriteData.length === 0 ? (
                <div className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <h3 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
                        You don't have any favorites yet! Start adding your favorite coins.
                    </h3>
                </div>
            ) : (
                store.favoriteData.map((favorite, index) => {
                    const chartdata = store.favoritePriceData.filter((array) => array[0].id === favorite.id);

                return (
                        <div key={favorite.id} className="favCardOut card col-4">
                        <div className="favCardIn">
                            <div className="favCardTop card-img-top">
                                {/* <SparklineChart data={favorite.sparkline_in_7d.price} width={300} height={150} /> */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartdata[0]}>
                                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                        <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                        <XAxis dataKey="date" height={0}/>
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="favCardBody card-body">
                                <h5 className="card-title">{favorite.name}</h5>
                                <p className="card-text">{favorite.symbol}</p>
                                <p className="card-text"><strong>Current Price:</strong> ${favorite.current_price}</p>
                                <Link to={"/moreInfo/" + favorite.id }>
								<span className="favMoreInfoButton btn">More Information</span>
							    </Link>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleFavoriteToggle(favorite)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
