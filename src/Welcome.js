import React, { useState, useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Hello from "./Hello";
import Downloads from "./Downloads";
//import useChooseLanguage from "./chooseLanguage";
import Login from "./Login";
import ResetPw from "./ResetPw";
import Infos from "./Infos";
import Apply from "./Apply";

//recaptcha stuff
import Recaptcha from "react-google-recaptcha";
//translation stuff
import { IntlProvider } from "react-intl";
import de from "./translations/de.json";
import en from "./translations/en.json";

export default function Welcome() {
    const messages = {
        de: de,
        en: en,
    };

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
            <IntlProvider locale={language} messages={messages[language]}>
                <HashRouter>
                    <div>
                        <Route exact path="/">
                            <Hello registered={registered} />
                        </Route>

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
                            <Apply
                                dataWelcomeToApply={language}
                                register={register}
                            />
                        </Route>
                    </div>
                </HashRouter>
            </IntlProvider>
        </div>
    );
}
