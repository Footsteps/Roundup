import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Downloads from "./Downloads";
import data from "./data.json";
import Registration from "./Registration";
import Login from "./Login";
import Infos from "./Infos";
import Apply from "./Apply";

export default function Hello() {
    return (
        <div>
            <img src="./logo.jpg" className="bgImg" />
            <div className="nav">
                <p>
                    <Link to="/downloads">FLYER</Link>
                </p>
                <p>
                    <Link to="/apply">ANMELDEN</Link>
                </p>
                <p>
                    <Link to="/register">KONTO ANLEGEN</Link>
                </p>
                <p>
                    <Link to="/login">LOGIN</Link>
                </p>
                <p>
                    <Link to="/infos">Infos</Link>
                </p>
            </div>
            <div className="start">
                <div className="wrapper title">
                    <h2>{data[0].nummer} Al-Anon Treffen in Deutschland</h2>

                    <h3>
                        mit AA-Beteiligung. Deutsch- und englischsprachige
                        Meetings.
                    </h3>
                    <h1>{data[0].thema}</h1>
                </div>
            </div>
            <div>
                <Switch>
                    <Route path="/downloads" component={Downloads}></Route>
                    <Route path="/register" component={Registration}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/infos" component={Infos}></Route>
                    <Route path="/apply" component={Apply}></Route>
                </Switch>
            </div>
        </div>
    );
}
