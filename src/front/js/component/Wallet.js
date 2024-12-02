import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SparklineChart } from "../pages/sparklineChart";

export const Wallet = () => {
    const { store, actions } = useContext(Context);

    // Define the handleFavoriteToggle function
    const handleFavoriteToggle = (wallet) => {
        if (store.favorites.some((favCoin) => favCoin.id === wallet.id)) {
            actions.removeFavorite(wallet.id); // Assuming you have this action
        } else {
            actions.addFavorite(wallet); // Assuming you have this action
        }
    };

    // Optional: Handle navigation if "More Information" is needed
    const navigate = useNavigate();

    // Optional: Handle Trade button click
    const handleTrade = (wallet) => {
        // Implement your trade logic here
        console.log(`Trade clicked for ${wallet.name}`);
    };

    // Ensure store.wallet is defined and is an array
    if (!store.wallet || !Array.isArray(store.wallet)) {
        return <p>Loading wallet data...</p>;
    }

    return (
        <table className="wallet-table" style={{ width: "90vw"}}>
            <thead>
                <tr>
                    <th>Name:</th>
                    <th>Current Price:</th>
                    <th>Quantity:</th>
                    <th>Total Spent:</th>
                    <th>Graph:</th>
                    <th>Options:</th>
                    <th>Favorite:</th>
                    <th>Data:</th>
                </tr>
            </thead>
            <tbody>
                {store.wallet.map((wallet) => (
                    <tr key={wallet.id}>
                        <td>
                            <div className="wallet-info">
                                
                                <div>
                                    <h5 className="wallet-name">{wallet.name}</h5>
                                    <div className="wallet-symbol">{wallet.symbol.toUpperCase()}</div>
                                    <img src={wallet.image} alt={wallet.name} className="wallet-image" />
                                </div>
                            </div>
                        </td>
                        <td>${wallet.current_price.toLocaleString()}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                            <SparklineChart data={wallet.sparkline_in_7d.price} width={150} height={50} />
                        </td>
                        <td>
                            <button className="trade-button" onClick={() => handleTrade(wallet)}>
                                Trade
                            </button>
                        </td>
                        <td>
                            <button
                                className={`star-button ${
                                    store.favorites.some((favCoin) => favCoin.id === wallet.id) ? "favorited" : ""
                                }`}
                                onClick={() => handleFavoriteToggle(wallet)}
                            >
                                {store.favorites.some((favCoin) => favCoin.id === wallet.id) ? "★" : "☆"}
                            </button>
                        </td>
                        <td>
                            <Link to={`/coin/${wallet.id}`} className="btn btn-secondary">
                                More Information
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
