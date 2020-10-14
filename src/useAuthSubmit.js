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

export function useAuthSubmit(route, value, register, verified) {
    const [error, setError] = useState(false);
    //console.log("register in useAuthSubmit", register);
    console.log("verified in useAuthSubmit", verified);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!verified) {
            console.log("verified is false!!!");
            setError("verified");
        } else {
            //console.log("browser language", navigator.languages);

            axios.post(route, value).then((resp) => {
                console.log("resp from handleSubmit", resp);

                if (resp.data.success) {
                    location.replace("/");
                } else if (resp.data.email) {
                    console.log("email already exists!!!");
                    setError("email");
                } else if (resp.data.visitorSuccess) {
                    //setError("message");
                    //console.log("calling register now");
                    register("register says somebody registered");
                    //location.replace("/");
                } else {
                    console.log("err happened!!!");
                    //if something breaks
                    setError("other");
                }
            });
        }
        //console.log("value in handleSubmit: ", value);
    };
    return [error, handleSubmit];
}
