import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Hello from "./Hello";
import Login from "./Login";
import ResetPw from "./ResetPw";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Hello} />
                    <Route path="/register" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPw} />
                </div>
            </HashRouter>
        </div>
    );
}
