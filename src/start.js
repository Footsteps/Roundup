import React from "react";
import ReactDOM from "react-dom";
//import HelloWorld from "./HelloWorld";
import Welcome from "./Welcome";
import App from "./App";
//import socket
import { init } from "./Socket";
//import redux stuff
//provider provides the state
import { Provider } from "react-redux";
//redux promise allows us to dispatch actions that are asynchronous
import reduxPromise from "redux-promise";

//devtools & createstore
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
//store needs reducer
import reducer from "./reducer";

//translation stuff
import { IntlProvider } from "react-intl";
import de from "./translations/de.json";
import en from "./translations/en.json";
const messages = {
    de: de,
    en: en,
};
//const language = "en";
const language = navigator.language.split(/[-_]/)[0];
console.log("language", language);

//const english = document.getElementById("english");
//english.addEventListener("click", () => alert("Hi user!"));
//create store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

//write code so that welcome only shows up when I am on welcome route
let component;
if (location.pathname === "/welcome") {
    component = (
        <IntlProvider locale={language} messages={messages[language]}>
            <Welcome />;
        </IntlProvider>
    );
} else {
    init(store);
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(component, document.querySelector("main"));

/*
ReactDOM.render(<HelloWorld />, document.querySelector("main"));
*/
