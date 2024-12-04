import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { SparklineChart } from "./sparklineChart";
import "../../styles/index.css";
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

export const Listing = () => {
    const { store, actions } = useContext(Context);


    // if (!store.coins || store.coins.length === 0) {
    //     console.log("Fetching coins data...");
    //     actions.fetchCoins();
    // }

    // if (store.loading) {
    //     return <div>Loading...</div>;
    // }

    // if (store.coins.length === 0) {
    //     return <div>No coins available.</div>;
    // }

    const handleFavoriteToggle = (coin) => {
        if (store.favorites.some((favCoin) => favCoin.id === coin.id)) {
            actions.removeFromFavs(coin.id);
        } else {
            actions.addToFavs(coin.id, coin.name, coin.symbol, coin.current_price);
        }
    };

    return (
        <table className="coin-table">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Price</th>
                    <th>Chart</th>
                    <th>Change (24h)</th>
                    <th>Market Cap</th>
                    <th>Volume</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {store.coins.map((coin) => (
                    <tr key={coin.id}>
                        <td>
                            <div className="coin-info">
                                <img src={coin.image} alt={coin.name} className="coin-image" />
                                <div>
                                    <div className="coin-name">{coin.name}</div>
                                    <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                                </div>
                            </div>
                        </td>
                        <td>${coin.current_price.toLocaleString()}</td>
                        <td>
                            <div>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart width={width} height={height} data={coin.sparkline_in_7d.price.map((price, index) => ({ index, price }))}>
                                        <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                        <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                    </LineChart>
                            </div>
                        </td>
                        <td>
                            <span
                                style={{
                                    color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
                                }}
                            >
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </td>
                        <td>${coin.market_cap.toLocaleString()}</td>
                        <td>${coin.total_volume.toLocaleString()}</td>
                        <td>
                            <button className="trade-button">Trade</button>
                        </td>
                        <td>
                            <button
                                className={`star-button ${store.favorites.some((favCoin) => favCoin.id === coin.id) ? "favorited" : ""
                                    }`}
                                onClick={() => handleFavoriteToggle(coin)}
                            >
                                {store.favorites.some((favCoin) => favCoin.id === coin.id) ? "★" : "☆"}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
