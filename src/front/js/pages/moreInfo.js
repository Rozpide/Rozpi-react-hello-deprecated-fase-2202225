import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';

export const MoreInfo = () => {
    const { store, actions } = useContext(Context);

    // States for the news feed and description
    const [news, setNews] = useState([]);
    const [description, setDescription] = useState("");
    const [loadingNews, setLoadingNews] = useState(true);

    // Fetch price data on component mount
    useEffect(() => {
        actions.setCurrentCoinId("bitcoin"); // Default coin
        actions.setCurrency("USD"); // Default currency
        actions.setTimeFrame("7"); // Default timeframe
        actions.getPriceData();
    }, []);

    // Fetch news data from The Guardian API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    "https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=bitcoin"
                );
                if (response.ok) {
                    const data = await response.json();
                    if (data.response && data.response.results) {
                        setNews(data.response.results); // Populate the news state
                    } else {
                        console.warn("No articles found in the response.");
                    }
                } else {
                    console.error("Error fetching news:", response.statusText);
                }
            } catch (error) {
                console.error("Network or server error:", error);
            } finally {
                setLoadingNews(false); // Stop the loading spinner
            }
        };

        fetchNews();
    }, []);

    // Fetch description from CoinGecko API
    useEffect(() => {
        const fetchDescription = async () => {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
                if (response.ok) {
                    const data = await response.json();
                    if (data.description && data.description.en) {
                        setDescription(data.description.en); // English description
                    } else {
                        console.warn("No description found in the response.");
                    }
                } else {
                    console.error("Error fetching description:", response.statusText);
                }
            } catch (error) {
                console.error("Network or server error while fetching description:", error);
            }
        };

        fetchDescription();
    }, []);

    // Update price data based on timeframe or currency changes
    useEffect(() => {
        actions.getPriceData();
    }, [store.timeFrame, store.currency]);

    return (
        <div className="moreInfo">
            {/* Back to List Button */}
            <div className="backToList">
                <button
                    type="button"
                    style={{
                        backgroundColor: "#39ff14",
                        borderRadius: "5px",
                        height: "50px",
                        width: "90px",
                        border: "1px solid black",
                    }}
                >
                    Back to list
                </button>
            </div>

            {/* Main Info Section */}
            <div className="mainInfo">
                {/* Coin Name */}
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px", color: "white" }}>
                    {store.currentCoinName || "Bitcoin"}
                </div>

                {/* Graph Box */}
                <div className="graphBox">
                    <div className="graphButtonsBox">
                        <div className="timeFrame" role="group">
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("1")}>1D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("7")}>7D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("30")}>30D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("365")}>1Y</button>
                        </div>
                        <div className="currency" role="group">
                            <button className="graphButtons2" onClick={() => actions.setCurrency("USD")}>USD</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("CAD")}>CAD</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("EUR")}>EUR</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("GBP")}>GBP</button>
                            <button className="graphButtons2" onClick={() => actions.setCurrency("JPY")}>JPY</button>
                        </div>
                    </div>
                    <div className="bigGraph">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={store.currentCoinPriceData}>
                                <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                <XAxis dataKey="date" tick={null} />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>
                        </div>
                    </div>
                </div>

                {/* News Feed Section */}
                <div className="news">
                    <h1>News feed for this crypto</h1>
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
                        <p>No news articles found for Bitcoin.</p>
                    )}
                </div>

                {/* Description Section */}
                <div className="description">
                    <h2>About</h2>
                    {description ? (
                        <p style={{ color: "white", lineHeight: "1.6", padding: "10px" }}>
                            {description.length > 1000 ? `${description.substring(0, 1000)}...` : description}
                        </p>
                    ) : (
                        <p style={{ color: "white" }}>Loading description...</p>
                    )}
                </div>

            </div>
        </div>
    );
};
