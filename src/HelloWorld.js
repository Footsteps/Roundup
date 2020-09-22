//this file has the same exact name as the component
import React from "react";
import Name from "./Name";

export default function HelloWorld() {
    const name = "ivana";
    const cuteAnimal = "Moose";
    return (
        <div>
            <h1 className="title">Hello, {name}!</h1>
            <p>lorem ipsum</p>
            <Name cuteAnimal={cuteAnimal} />
        </div>
    );
}
