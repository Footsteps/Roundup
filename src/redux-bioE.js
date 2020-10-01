import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { myActionCreator } from "./actions";

export default function BioEditor() {
    //get info from global state and store it in variable bio
    //it will get updated
    const bio = useSelector((state) => state.user.bio);

    //use Dispatch with onClick
    //a Dispatch is just an object.
    //we declare them in actions.js
    //dispatch calls one of the functions living in actions.js
    return (
        <div onClick={() => useDispatch(myActionCreator(bio))}>
            I am the bio Editor: {bio}
        </div>
    );
}
