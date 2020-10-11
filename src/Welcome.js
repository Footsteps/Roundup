import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Hello from "./Hello";
import Downloads from "./Downloads";

import Login from "./Login";
import ResetPw from "./ResetPw";
import Infos from "./Infos";
import Apply from "./Apply";

export default function Welcome() {
    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Hello} />
                    <Route path="/downloads">
                        <Downloads />
                    </Route>
                    <Route path="/register">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPw />
                    </Route>
                    <Route path="/infos">
                        <Infos />
                    </Route>
                    <Route path="/apply">
                        <Apply />
                    </Route>
                </div>
            </HashRouter>
        </div>
    );
}
