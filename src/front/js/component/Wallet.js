import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { SparklineChart } from "../pages/sparklineChart";
import { TradeModal } from "./tradeModal";

export const Wallet = () => {
    const { store, actions } = useContext(Context);

    // State for controlling the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    // Fetch the logged-in user's ID
    const userId = store.user?.id; // Assuming user data is stored in the store

    useEffect(() => {
        if (userId && (!store.wallet || store.wallet.length === 0)) {
            actions.fetchWalletData(userId); // Pass userId to fetchWalletData
        }
    }, [userId, store.wallet, actions]);

    const handleOpenModal = (coin) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleTrade = (type, quantity) => {
        console.log(`${type.toUpperCase()} ${quantity} of ${selectedCoin.name}`);
        // Call an action or API to execute the trade logic
        actions.tradeCoin(selectedCoin.id, type, quantity);
        setIsModalOpen(false); // Close the modal after trade
    };

    if (!store.wallet || !Array.isArray(store.wallet)) {
        return <p>Loading wallet data...</p>;
    }

    return (
        <div className="wallet-page">
            <h2>Your Wallet</h2>
            <table className="wallet-table" style={{ width: "90vw" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Current Price</th>
                        <th>Quantity Owned</th>
                        <th>Total Spent</th>
                        <th>Graph (7d)</th>
                        <th>Quick Actions</th>
                        <th>Market Details</th>
                    </tr>
                </thead>
                <tbody>
                    {store.wallet.map((wallet) => (
                        <tr key={wallet.id}>
                            <td>
                                <div className="wallet-info">
                                    <h5 className="wallet-name">{wallet.name}</h5>
                                    <div className="wallet-symbol">{wallet.symbol.toUpperCase()}</div>
                                    <img
                                        src={wallet.image}
                                        alt={wallet.name}
                                        className="wallet-image"
                                    />
                                </div>
                            </td>
                            <td>${wallet.current_price.toLocaleString()}</td>
                            <td>{wallet.quantity_owned || 0}</td>
                            <td>${(wallet.quantity_owned * wallet.purchase_price || 0).toLocaleString()}</td>
                            <td>
                                <SparklineChart
                                    data={wallet.sparkline_in_7d?.price || []}
                                    width={150}
                                    height={50}
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleOpenModal(wallet)}
                                >
                                    Trade
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
