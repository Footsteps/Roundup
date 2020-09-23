import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPw from "./ResetPw";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to my social network!</h1>
            <img src="./logo.jpg" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPw} />
                </div>
            </HashRouter>
        </div>
    );
}
