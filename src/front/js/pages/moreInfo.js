import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";

export const MoreInfo = () => {
    const { store, actions } = useContext(Context);
    const [timeFrame, setTimeFrame] = useState("7"); // Default time frame
    const [alertPrice, setAlertPrice] = useState(0); // State to manage alert price input
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const params = useParams(); // Get coin ID from the URL

    // Fetch price data and coin details on component mount
    useEffect(() => {
        actions.setCurrentCoinId(params.id);
        actions.setCurrency("usd");
        actions.setTimeFrame(timeFrame);
        actions.getCurrentCoinPriceData();
        actions.getCurrentCoinData();
    }, [params.id, timeFrame]);

    // Fetch news data on component mount
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=${params.id}`
                );
                if (response.ok) {
                    const data = await response.json();
                    if (data.response && data.response.results) {
                        setNews(data.response.results);
                    }
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoadingNews(false);
            }
        };

        fetchNews();
    }, [params.id]);

    // Handle setting the price alert
    const handleSetAlert = () => {
        setAlertPrice(Number(document.getElementById("alert_price").value))
        if (!alertPrice || isNaN(alertPrice)) {
            alert("Please enter a valid price.");
            return;
        }

        actions.addAlert(store.currentCoinData.id, store.currentCoinData.name, parseFloat(alertPrice));
        alert(`Alert set for ${store.currentCoinData.name} at $${alertPrice}`);
        setAlertPrice(""); // Reset input field
    };

    const graphOptions = (time) => {
        setTimeFrame(time); // Update the time frame
    };

    useEffect(() => {
        actions.getCurrentCoinPriceData();
    }, [store.currency, store.timeFrame]);

    useEffect(() => {
        actions.loadAlerts();
    }, []);

    return (
        <div className="moreInfo">
            {/* Main Info Section */}
            <div className="mainInfo">
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px", color: "white" }}>
                    {store.currentCoinData.name} ({params.id})
                </div>

                {/* Graph Box */}
                <div className="topHalf">
                    <div className="graphBox">
                        <div className="graphButtonsBox">
                            <div className="timeFrame" role="group">
                                <button onClick={() => graphOptions("1")} className={timeFrame === "1" ? "active" : ""}>1D</button>
                                <button onClick={() => graphOptions("7")} className={timeFrame === "7" ? "active" : ""}>7D</button>
                                <button onClick={() => graphOptions("30")} className={timeFrame === "30" ? "active" : ""}>30D</button>
                                <button onClick={() => graphOptions("365")} className={timeFrame === "365" ? "active" : ""}>1Y</button>
                            </div>
                        </div>
                        <div className="bigGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={store.currentCoinPriceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                    <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                    <XAxis dataKey="date" height={0} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div id="marketData">
                        <h4>Current Price: ${store.currentCoinData.market_data?.current_price?.usd?.toLocaleString() || "-"}</h4>
                        <h4>24H High: ${store.currentCoinData.market_data?.high_24h?.usd?.toLocaleString() || "-"}</h4>
                        <h4>24H Low: ${store.currentCoinData.market_data?.low_24h?.usd?.toLocaleString() || "-"}</h4>
                        <button type="submit" onClick={() => setIsModalOpen(true)} style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>
                    </div>
                </div>

                {/* Alert Configuration Section */}
                <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#1a1a1a", borderRadius: "5px" }}>
                    <h4 style={{ color: "#39ff14" }}>Set Price Alert</h4>
                    <input
                        id="alert_price"
                        type="number"
                        // value={alertPrice}
                        onSubmit={handleSetAlert}
                        placeholder="Enter target price"
                        style={{
                            padding: "8px",
                            borderRadius: "5px",
                            border: "1px solid #39ff14",
                            marginRight: "10px",
                            width: "200px",
                        }}
                    />
                    <button
                        onClick={handleSetAlert}
                        style={{
                            padding: "8px 15px",
                            backgroundColor: "#39ff14",
                            color: "black",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Set Alert
                    </button>
                </div>
                {/* Alerts List Section */}
                <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#1a1a1a", borderRadius: "5px" }}>
                    <h4 style={{ color: "#39ff14" }}>Your Alerts</h4>
                    {store.alerts.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {store.alerts.map((alert, index) => {
                                <li
                                    key={index}
                                    style={{
                                        marginBottom: "10px",
                                        padding: "10px",
                                        border: "1px solid #39ff14",
                                        borderRadius: "5px",
                                        backgroundColor: "#000",
                                        color: "#39ff14",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>
                                        {alert.coin_name} - Target: ${alert.target_price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => actions.removeAlert(index)} // Remove alert
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Remove
                                    </button>
                                </li>
                            })}
                        </ul>
                    ) : (
                        <p style={{ color: "#39ff14" }}>No alerts set.</p>
                    )}
                </div>

                {/* News Feed Section */}
                <div className="news">
                    <h1>News Feed</h1>
                    {loadingNews ? (
                        <p>Loading news...</p>
                    ) : news.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {news.map((article, index) => (
                                <li key={index} style={{ marginBottom: "20px" }}>
                                    <a
                                        href={article.webUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#39ff14", textDecoration: "none" }}
                                    >
                                        <h2>{article.webTitle}</h2>
                                    </a>
                                    <p>Published: {new Date(article.webPublicationDate).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No news articles found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
