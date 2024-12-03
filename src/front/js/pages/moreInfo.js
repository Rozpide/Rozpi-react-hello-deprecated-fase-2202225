import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis } from "recharts";

export const MoreInfo = () => {
    const { store, actions } = useContext(Context);

    // State for news data and loading indicator
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch price data on component mount
    useEffect(() => {
        actions.setCurrentCoinId("bitcoin");
        actions.setCurrency("USD");
        actions.setTimeFrame("7");
        actions.getPriceData();
    }, []);

    // Fetch news data from The Guardian API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                console.log("Fetching news from The Guardian...");
                const response = await fetch(
                    "https://content.guardianapis.com/search?api-key=611e5bde-dc1e-455b-9137-5f6caf90eda7&q=bitcoin"
                );
                console.log("Response status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Fetched articles:", data.response.results);
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
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="moreInfo">
            {/* Back to List Button */}
            <div className="backToList">
                <button
                    type="submit"
                    id="submitBtn"
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
                    Coin Name
                </div>

                {/* Graph Box */}
                <div className="graphBox">
                    {/* Timeframe and Currency Buttons */}
                    <div className="graphButtons">
                        <div className="timeFrame">
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>1day</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>10days</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>30days</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>1year</button>
                        </div>
                        <div className="currency">
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>USD</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>CAD</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>EUR</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>GBP</button>
                            <button style={{ backgroundColor: "blue", color: "white", border: "1px solid black" }}>JPY</button>
                        </div>
                    </div>

                    {/* Line Chart */}
                    <div className="bigGraph">
                        <LineChart width={900} height={520} data={store.currentCoinPriceData}>
                            <YAxis type="number" domain={["dataMin", "dataMax"]} width={0} />
                            <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                            <XAxis dataKey="date" tick={null} />
                            <Tooltip />
                        </LineChart>
                    </div>

                    {/* Trade Button */}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <button
                            type="submit"
                            id="submitBtn"
                            style={{
                                backgroundColor: "#39ff14",
                                borderRadius: "5px",
                                height: "38px",
                                width: "90px",
                                border: "1px solid black",
                            }}
                        >
                            Trade
                        </button>
                    </div>
                </div>

                {/* News Feed Section */}
                <div className="news">
                    <h1>News feed for this crypto</h1>
                    {loading ? (
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
            </div>
        </div>
    );
};
