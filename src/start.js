import React from "react";
import ReactDOM from "react-dom";
//import HelloWorld from "./HelloWorld";
import Welcome from "./Welcome";

//write code so that welcome only shows up when I am on welcome route
let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <img src="./logo.jpg" />;
}

ReactDOM.render(component, document.querySelector("main"));

/*
ReactDOM.render(<HelloWorld />, document.querySelector("main"));
*/
