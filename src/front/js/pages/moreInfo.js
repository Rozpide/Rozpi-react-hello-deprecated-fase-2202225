import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
//import { useNavigate } from "react-router-dom";


export const MoreInfo = () => {

    const { store, actions, setStore } = useContext(Context);

    useEffect(() => {
        // actions.setCurrentCoinId("bitcoin")
        // actions.setCurrency("USD")
        // actions.setTimeFrame("7")
        actions.getPriceData()
    }, [])

    return (

        <div className="moreInfo">

            <div className="backToList">
                <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "50", width: "90px", border: "1px solid black" }}>Back to list</button>
            </div>

            <div className="mainInfo">
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px" }}>
                    Graph


                </div>
                <div className="graphBox">
                    <div className="graph">
                        <div className="timeFrame">
                            <button>1day</button>
                            <button>10days</button>
                            <button>30days</button>
                            <button>1year</button>
                        </div>
                        <div className="currency">
                            <button>USD</button>
                            <button>canadian</button>
                            <button>euro</button>
                            <button>dont know</button>
                            <button>yemen</button>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "70vh" }}>
                            <LineChart width={300} height={200} data={store.currentCoinPriceData}>
                                <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                            </LineChart>
                        </div>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "38px", width: "90px", border: "1px solid black" }}>Trade</button>
                        </div>
                    </div>
                </div>
                <div className="news">
                    <h1>News feed for this crypto</h1>
                    <p></p>
                </div>
            </div>

        </div>
    )
}