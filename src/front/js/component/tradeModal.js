import React from "react";
import "../../styles/index.css"; // Adjust the path to your CSS file
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";


export const TradeModal = (coin) => {
    // if (!isOpen) return null; // Render nothing if `isOpen` is false
    const { store, actions } = useContext(Context);
    const [buy, setBuy] = useState(true)
    const [byCost, setByCost] = useState(true)
    const [ price, setPrice] = useState("")
	const [ quantity, setQuantity] = useState("")
    let location = useLocation()

    const handleTrade = () => {
        const tradeType = document.getElementById("tradeType").value;
        const quantity = parseFloat(document.getElementById("quantity").value);

        if (tradeType && quantity > 0) {
            console.log(`Executing trade: ${tradeType} ${quantity} of ${coinName}`);
            onTrade(tradeType, quantity);
        } else {
            alert("Please select a trade type and enter a valid quantity.");
        }
    };

    const handleBuy = () => {
        console.log("fill this out later")
    }

    const handleSell = () => {
        console.log("fill this out later")
    }

    return (
        store.showTradeModal ?
            <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content trdModal">
                        <div className="modal-header">
                            <h5 className="modal-title">Trade</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => {actions.setShowTradeModal(false); setPrice(0); setQuantity(0)}}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center mb-3">
                                <button
                                    className={`btn ${buy ? "trdBtnSlctd" : "trdBtn"} me-2`}
                                    onClick={() => {
                                        setBuy(true);
                                    }}
                                >
                                    Buy
                                </button>
                                <button
                                    className={`btn ${!buy ? "trdBtnSlctd" : "trdBtn"}`}
                                    onClick={() => {
                                        setBuy(false);
                                    }}
                                >
                                    Sell
                                </button>
                            </div>
                            {buy ? (
                                <form onSubmit={handleBuy}>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button
                                            className={`btn ${byCost ? "trdBtnSlctd" : "trdBtn"} me-2`}
                                            onClick={() => {
                                                setByCost(true);
                                            }}>By Cost</button>
                                        <button
                                            className={`btn ${!byCost ? "trdBtnSlctd" : "trdBtn"}`}
                                            onClick={() => {
                                                setByCost(false);
                                            }}>By Quantity</button>
                                    </div>
                                    {byCost ? (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="buyCurrencyAmount" className="form-label">Amount in {store.currency.toUpperCase()}</label>
                                                <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} id="buyCurrencyAmount" name="buyCurrencyAmount" required />
                                            </div>
                                            <div className="mb-3">
                                                Total Coins: {price /
                                                    ((location.pathname == '/listingpage') ?
                                                        store.tradeCoin.current_price :
                                                        store.tradeCoin.market_data.current_price[store.currency])}{' '}{store.tradeCoin.name}
                                            </div>
                                            <button type="submit" className="btn trdBtn">Buy</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="buyQuantity" className="form-label">Quantity of {store.tradeCoin.name}</label>
                                                <input type="number" className="form-control" onChange={(e) => setQuantity(e.target.value)} id="buyQuantity" name="buyQuantity" required />
                                            </div>
                                            <div className="mb-3">
                                            Total Cost: {Number(
                                                quantity * 
                                                (location.pathname === '/listingpage' 
                                                    ? store.tradeCoin.current_price 
                                                    : store.tradeCoin.market_data.current_price[store.currency])
                                            ).toLocaleString()}{' '}
                                            {store.currency.toUpperCase()}
                                        </div>
                                    <button type="submit" className="btn trdBtn">Buy</button>
                                        </>
                                    )}
                                </form>
                            ) : (
                                <form onSubmit={handleSell}>
                                    <div className="d-flex justify-content-center mb-3">
                                        <button
                                            className={`btn ${byCost ? "trdBtnSlctd" : "trdBtn"} me-2`}
                                            onClick={() => {
                                                setByCost(true);
                                            }}>By Cost</button>
                                        <button
                                            className={`btn ${!byCost ? "trdBtnSlctd" : "trdBtn"}`}
                                            onClick={() => {
                                                setByCost(false);
                                            }}>By Quantity</button>
                                    </div>
                                    {byCost ? (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="sellCurrencyAmount" className="form-label">Amount in {store.currency.toUpperCase()}</label>
                                                <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} id="sellCurrencyAmount" name="sellCurrencyAmount" required />
                                            </div>
                                            <div className="mb-3">
                                                {price /
                                                    ((location.pathname == '/listingpage') ?
                                                        store.tradeCoin.current_price:
                                                        store.tradeCoin.market_data.current_price[store.currency])}{' '}{store.tradeCoin.name}</div>
                                            <button type="submit" className="btn trdBtn">Sell</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="sellQuantity" className="form-label">Quantity of {store.tradeCoin.name}</label>
                                                <input type="number" className="form-control" onChange={(e) => setQuantity(e.target.value)} id="sellQuantity" name="sellQuantity" required />
                                            </div>
                                            <div className="mb-3"> 
                                                {Number(quantity *
                                                    ((location.pathname == '/listingpage') ?
                                                        store.tradeCoin.current_price :
                                                        store.tradeCoin.market_data.current_price[store.currency])).toLocaleString()}{' '}
                                                {store.currency.toUpperCase()} </div>
                                            <button type="submit" className="btn trdBtn">Sell</button>
                                        </>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            :
            null
    );
};



{/* <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={() => actions.setShowTradeModal()}>×</button>
                    <h2>Trade {store.tradeCoin.name}</h2>
                    <div>
                        <label>
                            Trade Options:
                            <select id="tradeType">
                                <option value="buy">Buy</option>
                                <option value="sell">Sell</option>
                            </select>
                        </label>
                        <label>
                            Quantity:
                            <input type="number" min="1" id="quantity" placeholder="Enter quantity" />
                        </label>
                    </div>
                    <button className="btn btn-success" onClick={handleTrade}>Confirm Trade</button>
                </div>
            </div> */}

