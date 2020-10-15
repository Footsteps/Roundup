import React, { useState, useEffect } from "react";
import { HashRouter, Route, useHistory } from "react-router-dom";
import Registration from "./Registration";
import Hello from "./Hello";
import Downloads from "./Downloads";
//import useChooseLanguage from "./chooseLanguage";
import Login from "./Login";
import ResetPw from "./ResetPw";
import Infos from "./Infos";
import Apply from "./Apply";

//trying history stuff
//import {  } from "react-router-dom";

//translation stuff
import { IntlProvider } from "react-intl";
import de from "./translations/de.json";
import en from "./translations/en.json";

export default function Welcome() {
    const messages = {
        de: de,
        en: en,
    };
    let history = useHistory();
    const defaultValue = navigator.language.split(/[-_]/)[0];
    //console.log("default value", defaultValue);

    const [language, setLanguage] = useState(defaultValue);

    const [registered, setRegistered] = useState(false);

    console.log("registered before useEffect", registered);
    useEffect(() => {
        //console.log("language in useeffect", language);
        console.log("registered in useEffect", registered);
    }, [language, registered]);

    const handleLanguage = (e) => {
        //console.log("this language has been clicked: ", e.target.id);
        setLanguage(e.target.id);
        //console.log("language");
    };
    const register = (arg) => {
        console.log("arg in register", arg);
        setRegistered(true);
    };
    console.log("registered after useEffect", registered);

    return (
        <div>
            <div className="language" id="en" onClick={handleLanguage}>
                english
            </div>
            <div className="language" id="de" onClick={handleLanguage}>
                deutsch
            </div>
            <div>
                <IntlProvider locale={language} messages={messages[language]}>
                    <HashRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Hello
                                        dataWelcomeToApply={language}
                                        registered={registered}
                                    />
                                )}
                            />

                            <Route
                                exact
                                path="/downloads"
                                component={Downloads}
                            />

                            <Route
                                exact
                                path="/register"
                                component={Registration}
                            />

                            <Route exact path="/login" component={Login} />

                            <Route exact path="/reset" component={ResetPw} />

                            <Route path="/infos" component={Infos} />

                            <Route
                                exact
                                path="/apply"
                                render={() => (
                                    <Apply
                                        dataWelcomeToApply={language}
                                        register={register}
                                    />
                                )}
                            />
                        </div>
                    </HashRouter>
                </IntlProvider>
            </div>
        </div>
    );
}
