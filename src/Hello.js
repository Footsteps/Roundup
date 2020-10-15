import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";

import Downloads from "./Downloads";

import Registration from "./Registration";
import Login from "./Login";
import Infos from "./Infos";
import Apply from "./Apply";

import { FormattedMessage } from "react-intl";

export default function Hello({ registered }) {
    const location = useLocation();
    console.log("location", location);
    console.log("registered in hello", registered);
    return (
        <div>
            <img src="./12.jpg" className="bgImg" />
            <div className="nav">
                <p>
                    <Link to="/infos">INFOS</Link>
                </p>
                <p>
                    <Link to="/downloads">FLYER / MEETINGS</Link>
                </p>
                <p>
                    <Link to="/apply">
                        <FormattedMessage id="BOOKING" />
                    </Link>
                </p>
                <p>
                    <Link to="/register">
                        <FormattedMessage id="CREATE AN ACCOUNT" />
                    </Link>
                </p>
                <p>
                    <Link to="/login">LOGIN</Link>
                </p>
            </div>
            <div className="start">
                <div className="wrapper title">
                    {registered && (
                        <h2 id="yay">
                            <FormattedMessage id="yay" />
                        </h2>
                    )}
                    <h2>
                        <FormattedMessage id="nummer" />
                        <FormattedMessage id="Treffen" />
                    </h2>

                    <h3>
                        <FormattedMessage id="app.text" />
                    </h3>
                    <h1>
                        <FormattedMessage id="thema" />
                    </h1>
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
