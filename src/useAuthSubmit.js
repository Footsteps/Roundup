//src/useAuthSubmit.js
/*
this hook will work for login & registration

for error handleing --> one generic message for all of them

give this function access to what the user typed in --> call it in registration with the value-object from useStatefulFields
 --> useAuthSubmit(value);

 make the route dynamic: useAuthSubmit("/register", value);

 USE EFFECT WANTS AN IFFE!!!!
 */

import React, { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(route, value) {
    const [error, setError] = useState(false);
    //const [emailError, setEmailError] = useState(false);

    const handleSubmit = (e) => {
        //console.log("value in handleSubmit: ", value);
        e.preventDefault();
        axios.post(route, value).then((resp) => {
            //console.log("resp from handleSubmit", resp);

            if (resp.data.success) {
                location.replace("/");
            } else if (resp.data.email) {
                console.log("email already exists!!!");
                setError("email");
            } else {
                console.log("err happened!!!");
                //if something breaks
                setError("other");
            }
        });
    };
    return [error, handleSubmit];
}
