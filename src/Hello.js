import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Downloads from "./Downloads";

import data from "./data.json";

export default function Hello() {
    return (
        <div>
            <BrowserRouter>
                <div className="header1"></div>
                <div>
                    <img src="./logo.jpg" className="bgImg" />
                    <div className="start">
                        <div className="wrapper title">
                            <h2>
                                {data[0].nummer} Al-Anon Treffen in Deutschland
                            </h2>
                            <Link to="/download">FLYER</Link>
                            <h3>
                                mit AA-Beteiligung. Deutsch- und
                                englischsprachige Meetings.
                            </h3>
                            <h1>{data[0].thema}</h1>
                        </div>
                    </div>
                </div>
                <Route exact path="/download" component={Downloads} />
            </BrowserRouter>
        </div>
    );
}
