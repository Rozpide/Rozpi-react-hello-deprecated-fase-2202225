import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis } from 'recharts';
//import { useNavigate } from "react-router-dom";


export const MoreInfo = () => {

    const { store, actions, setStore } = useContext(Context);

    useEffect(() => {
        actions.setCurrentCoinId("bitcoin")
        actions.setCurrency("USD")
        actions.setTimeFrame("7")
        actions.getPriceData()
    }, [])

    return (

        <div className="moreInfo">

            <div className="backToList">
                <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "50", width: "90px", border: "1px solid black" }}>Back to list</button>
            </div>

            <div className="mainInfo">
                <div className="coinName" style={{fontSize:"25px", marginLeft:"80px", color:"white" }}>
                Coin Name


                </div>
                <div className="graphBox">
                    <div className="graphButtons">
                        <div className="timeFrame">
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>1day</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>10days</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>30days</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>1year</button>
                        </div>
                        <div className="currency" >
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>USD</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>canadian</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>euro</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>dont know</button>
                            <button style={{backgroundColor:"blue", color:"white", border:"1px solid black"}}>yemen</button>
                        </div>
                    </div>
                    <div>
                        <div className="bigGraph">
                            <LineChart width={900} height={520} data={store.currentCoinPriceData}>
                                <YAxis type="number" domain={['dataMin', 'dataMax']} width={0} />
                                <Line type="monotone" dataKey="price" stroke="#39ff14" strokeWidth={2} dot={false} />
                                <XAxis dataKey="date" tick= {null} />
                                <Tooltip />
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