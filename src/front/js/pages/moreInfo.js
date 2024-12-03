import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LineChart, Line, YAxis, Tooltip, XAxis, ResponsiveContainer } from 'recharts';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//import { useNavigate } from "react-router-dom";


export const MoreInfo = () => {

    const { store, actions, setStore } = useContext(Context);
    const [timeFrame, setTimeFrame] = React.useState('left');

    const handleChange = (event, newAlignment) => {
        setTimeFrame(newAlignment);
    };

    useEffect(() => {
        actions.setCurrentCoinId("bitcoin")
        actions.setCurrency("USD")
        actions.setTimeFrame("7")
        actions.getPriceData()
    }, [])

    useEffect(() => {
        actions.getPriceData();
    }, [store.timeFrame]);

    useEffect(() => {
        actions.getPriceData();
    }, [store.currency]);

    return (

        <div className="moreInfo">

            <div className="backToList">
                <button type="submit" id="submitBtn" style={{ backgroundColor: "#39ff14", borderRadius: "5px", height: "50", width: "90px", border: "1px solid black" }}>Back to list</button>
            </div>

            <div className="mainInfo">
                <div className="coinName" style={{ fontSize: "25px", marginLeft: "80px", color: "white" }}>
                    Coin Name


                </div>
                <div className="graphBox">
                    <div className="graphButtonsBox">
                    <div className="timeFrame" role="group" >
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("1")}>1D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("7")}>7D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("30")}>30D</button>
                            <button className="graphButtons" onClick={() => actions.setTimeFrame("365")}>1Y</button>
                        </div>
                        {/* <ToggleButtonGroup
                            color="primary"
                            value={timeFrame}
                            exclusive
                            onChange={handleChange}
                            aria-label="text alignment"
                        >
                            <ToggleButton className="graphButtons" value="left" aria-label="left aligned">
                                1D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="center" aria-label="centered">
                                7D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="right" aria-label="right aligned">
                                30D
                            </ToggleButton>
                            <ToggleButton className="graphButtons" value="year" aria-label="justified">
                                1Y
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        {/* <div className="timeFrame btn-group" role="group">
                            <input type='radio' id='p1' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("1")} />
                            <label className="graphButtons btn" for='p1'>1D</label>
                            <input type='radio' id='p2' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("7")} />
                            <label className="graphButtons btn" for='p2'>7D</label>
                            <input type='radio' id='p3' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("30")} />
                            <label className="graphButtons btn" for='p3'>30D</label>
                            <input type='radio' id='p4' name='primary' className="graphButtons btn-check" onClick={() => actions.setTimeFrame("365")} />
                            <label className="graphButtons btn" for='p4'>1Y</label>
                        </div> */}
                        <div className="currency" role="group" >
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