import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import { TradeModal } from "../component/tradeModal";

    
export const MoreInfo = (coin) => {
    const { store, actions } = useContext(Context);
    ///const coin = coin
    const [timeFrame, setTimeFrame] = React.useState('left');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [whitepaper, setWhitepaper] = useState("");
    const [loadingNews, setLoadingNews] = useState(true);

    const handleChange = (event, newAlignment) => {
        setTimeFrame(newAlignment);
    };

    // Fetch price data on component mount
    useEffect((coin) => {
        actions.setCurrentCoinId("bitcoin");
        actions.setCurrency("USD");
        actions.setTimeFrame("7");
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

    // Fetch whitepaper from CoinGecko API
    useEffect(() => {
        const fetchWhitepaper = async () => {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
                if (response.ok) {
                    const data = await response.json();
                    if (data.links && data.links.blockchain_site && data.links.blockchain_site.length > 0) {
                        const whitepaperUrl = data.links.blockchain_site.find((url) =>
                            url.toLowerCase().includes("bitcoin.pdf")
                        );
                        setWhitepaper(whitepaperUrl || null); // Set whitepaper URL or null if not found
                    } else {
                        console.warn("Whitepaper URL not found in the response.");
                        setWhitepaper(null); // No whitepaper available
                    }
                } else {
                    console.error("Error fetching whitepaper:", response.statusText);
                    setWhitepaper(null);
                }
            } catch (error) {
                console.error("Network or server error while fetching whitepaper:", error);
                setWhitepaper(null);
            }
        };

        fetchWhitepaper();
    }, []);

    // Update price data based on timeframe or currency changes
    useEffect(() => {
        actions.getPriceData();
    }, [store.timeFrame, store.currency]);

    // Function to open the modal
    const handleTrade = () => {
        setIsModalOpen(true);
    };

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
                    <div>
                        <div className="bigGraph">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={store.currentCoinPriceData}>
                                    <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                    <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                    <XAxis dataKey="date" tick={null} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>  
                        <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>   
                        {isModalOpen && selectedCoin && (
                            <TradeModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onTrade={handleTrade}
                                coinName={selectedCoin.name}
                            />
                        )}
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

                {/* Whitepaper Section */}
                <div className="description">
                    <h2>Whitepaper</h2>
                    {whitepaper ? (
                        <a
                            href={whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#39ff14", textDecoration: "none" }}
                        >
                            View the Bitcoin Whitepaper
                        </a>
                    ) : (
                        <p style={{ color: "white" }}>Whitepaper not available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};





