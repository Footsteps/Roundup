import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Hello from "./Hello";
import Downloads from "./Downloads";
import chooseLanguage from "./chooseLanguage";
import Login from "./Login";
import ResetPw from "./ResetPw";
import Infos from "./Infos";
import Apply from "./Apply";

export default function Welcome() {
    const [language, handleLanguage] = chooseLanguage();

    useEffect(() => {
        console.log("language has been clicked!!!!", language);
    }, [language]);

    return (
        <div>
            <div
                className="language"
                id="english"
                onClick={(e) => handleLanguage(e)}
            >
                english
            </div>
            <div
                className="language"
                id="deutsch"
                onClick={(e) => handleLanguage(e)}
            >
                deutsch
            </div>
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
