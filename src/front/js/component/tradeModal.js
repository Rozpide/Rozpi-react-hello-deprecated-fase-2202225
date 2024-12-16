import React from "react";
import "../../styles/index.css"; // Adjust the path to your CSS file
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export const TradeModal = (coin) => {
    // if (!isOpen) return null; // Render nothing if `isOpen` is false
    const { store, actions } = useContext(Context);
    const [buy, setBuy] = useState(true)
    const [byCost, setByCost] = useState(true)
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [ownedQuantity, setOwnedQuantity] = useState()
    const [ownedValue, setOwnedValue] = useState()
    let location = useLocation()
    const timestamp = new Date(Date.now())




    // const handleTrade = () => {
    //     const tradeType = document.getElementById("tradeType").value;
    //     const quantity = parseFloat(document.getElementById("quantity").value);

    //     if (tradeType && quantity > 0) {
    //         console.log(`Executing trade: ${tradeType} ${quantity} of ${coinName}`);
    //         onTrade(tradeType, quantity);
    //     } else {
    //         alert("Please select a trade type and enter a valid quantity.");
    //     }
    // };

    const handleBuy = (e) => {
        e.preventDefault();
        actions.buyCoin(store.tradeCoin, price, quantity, timestamp);
        actions.removeFundsFromWallet(store.funds - Number(price));
        actions.setShowTradeModal(false)
    }

    const verifyAmount = (value) => {
        if (value > ownedValue) {

        }
    }

    const handleSell = () => {
    }



    const availableToSell = () => {
        let ownedCoin = store.walletIds.find((owned) => owned.coin_id === store.tradeCoin.id)
        if (ownedCoin) {
            setOwnedQuantity(ownedCoin.quantity_owned);
            setOwnedValue(Number(ownedCoin.quantity_owned *
                (location.pathname === '/listingpage'
                    ? store.tradeCoin.current_price
                    : store.tradeCoin.market_data.current_price[store.currency])))
        }
    }

    useEffect(
        () => {
            if (store.showTradeModal) {
                availableToSell()
            }
        },
        [store.showTradeModal]
    )

    //return ownedCoin ? `Available Quantity: ${ownedCoin.quantity_owned}` : "No Coins Available"

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
                                onClick={() => { actions.setShowTradeModal(false); setPrice(0); setQuantity(0) }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center mb-3">
                                <button
                                    className={`btn ${buy ? "trdBtnSlctd" : "trdBtn"} me-2`}
                                    onClick={(e) => {
                                        e.preventDefault(); setBuy(true); setPrice(0); setQuantity(0)
                                    }}
                                >
                                    Buy
                                </button>
                                <button
                                    className={`btn ${!buy ? "trdBtnSlctd" : "trdBtn"}`}
                                    onClick={(e) => {
                                        e.preventDefault(); setBuy(false); setPrice(0); setQuantity(0)
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
                                            onClick={(e) => {
                                                e.preventDefault(); setByCost(true); setPrice(0); setQuantity(0)
                                            }}>By Cost</button>
                                        <button
                                            className={`btn ${!byCost ? "trdBtnSlctd" : "trdBtn"}`}
                                            onClick={(e) => {
                                                e.preventDefault(); setByCost(false); setPrice(0); setQuantity(0)
                                            }}>By Quantity</button>
                                    </div>
                                    {byCost ? (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="buyCurrencyAmount" className="form-label">Amount in {store.currency.toUpperCase()}</label>
                                                <input type="number" className="form-control" onChange={
                                                    (e) => {
                                                        let price = e.target.value
                                                        setPrice(e.target.value);
                                                        setQuantity(price /
                                                            ((location.pathname == '/listingpage') ?
                                                                store.tradeCoin.current_price :
                                                                store.tradeCoin.market_data.current_price[store.currency]))
                                                    }} id="buyCurrencyAmount" name="buyCurrencyAmount" required />
                                            </div>
                                            <div className="mb-3">
                                                Total Coins: {price /
                                                    ((location.pathname == '/listingpage') ?
                                                        store.tradeCoin.current_price :
                                                        store.tradeCoin.market_data.current_price[store.currency])}{' '}{store.tradeCoin.name}
                                            </div>
                                            <button type="submit" className="btn trdBtn" onClick={(e) => handleBuy(e)}>Buy</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="buyQuantity" className="form-label">Quantity of {store.tradeCoin.name}</label>
                                                <input type="number" className="form-control" onChange={
                                                    (e) => {
                                                        let quantity = e.target.value
                                                        setQuantity(e.target.value);
                                                        setPrice(Number(
                                                            quantity *
                                                            (location.pathname === '/listingpage'
                                                                ? store.tradeCoin.current_price
                                                                : store.tradeCoin.market_data.current_price[store.currency])))
                                                    }} id="buyQuantity" name="buyQuantity" required />
                                            </div>
                                            <div className="mb-3">
                                                Total Cost: {Number(
                                                    quantity *
                                                    (location.pathname === '/listingpage'
                                                        ? store.tradeCoin.current_price
                                                        : store.tradeCoin.market_data.current_price[store.currency])).toLocaleString()}{' '}{store.currency.toUpperCase()}
                                            </div>
                                            <button type="submit" className="btn trdBtn" onClick={(e) => handleBuy(e)}>Buy</button>
                                        </>
                                    )}
                                </form>
                            ) : (
                                <form onSubmit={handleSell}>
                                    <div className="qOwned">{ownedQuantity > 0 ? (`Available quantity: ${ownedQuantity}`) : ("You do not own this coin")}</div>
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
                                                <input type="number" className="form-control" onChange={(e) => {
                                                    let price = e.target.value;
                                                    setPrice(e.target.value);
                                                    setQuantity(price /
                                                        ((location.pathname == '/listingpage') ?
                                                            store.tradeCoin.current_price :
                                                            store.tradeCoin.market_data.current_price[store.currency]))
                                                    
                                                }} id="sellCurrencyAmount" name="sellCurrencyAmount" required />
                                            </div>
                                            <div className="mb-3">
                                                {price /
                                                    ((location.pathname == '/listingpage') ?
                                                        store.tradeCoin.current_price :
                                                        store.tradeCoin.market_data.current_price[store.currency])}{' '}{store.tradeCoin.name}</div>
                                            <button type="submit" className="btn trdBtn">Sell</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="sellQuantity" className="form-label">Quantity of {store.tradeCoin.name}</label>
                                                <input type="number" className="form-control" onChange={(e) => {
                                                    let quantity = e.target.value;
                                                    setQuantity(e.target.value);
                                                    setPrice(Number(quantity *
                                                        ((location.pathname == '/listingpage') ?
                                                            store.tradeCoin.current_price :
                                                            store.tradeCoin.market_data.current_price[store.currency])))
                                                }} id="sellQuantity" name="sellQuantity" required />
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




//backup of handlesell 
{/* <form onSubmit={handleSell}>
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
                           )} */}