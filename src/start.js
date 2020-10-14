import React, { useEffect, useState } from "react";
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

//create store
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

//console.log("language has changed!!! language in line 45", language);
//write code so that welcome only shows up when I am on welcome route
let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
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
