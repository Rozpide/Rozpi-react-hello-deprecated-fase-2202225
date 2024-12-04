import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { SparklineChart } from "./sparklineChart";
import { TradeModal } from "../component/tradeModal";
import "../../styles/index.css";

export const Listing = () => {
    const { store, actions } = useContext(Context);

    // State for controlling the modal and the selected coin
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        // Fetch coins data if not already available
        if (!store.coins || store.coins.length === 0) {
            console.log("Fetching coins data...");
            actions.fetchCoins();
        }
    }, [store.coins, actions]);

    const handleOpenModal = (coin) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleTrade = (type, quantity) => {
        console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
        // Example action to handle trade logic
        actions.tradeCoin(selectedCoin.id, type, quantity);
        setIsModalOpen(false); // Close the modal after trade
    };

    const handleFavoriteToggle = (coin) => {
        if (store.favorites.some((favCoin) => favCoin.id === coin.id)) {
            actions.removeFromFavs(coin.id);
        } else {
            actions.addToFavs(coin.id, coin.name, coin.symbol, coin.current_price);
        }
    };

    if (store.loading) {
        return <div>Loading...</div>;
    }

    if (!store.coins || store.coins.length === 0) {
        return <div>No coins available.</div>;
    }

    return (
        <div className="listing-page">
            <table className="coin-table">
                <thead>
                    <tr>
                        <th>Asset</th>
                        <th>Price</th>
                        <th>Chart (7d)</th>
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
                                <SparklineChart
                                    data={coin.sparkline_in_7d.price}
                                    width={150}
                                    height={50}
                                />
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
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleOpenModal(coin)}
                                >
                                    Trade
                                </button>
                            </td>
                            <td>
                                <button
                                    className={`star-button ${
                                        store.favorites.some((favCoin) => favCoin.id === coin.id)
                                            ? "favorited"
                                            : ""
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

            {/* Trade Modal */}
            {isModalOpen && selectedCoin && (
                <TradeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onTrade={handleTrade}
                    coinName={selectedCoin.name}
                />
            )}
        </div>
    );
};
