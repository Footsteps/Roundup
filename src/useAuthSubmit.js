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
import { useHistory } from "react-router-dom";

export function useAuthSubmit(route, value, register, verified) {
    const history = useHistory();
    //console.log("history in useAuthSubmit", history);
    const [error, setError] = useState(false);
    //console.log("register in useAuthSubmit", register);
    //console.log("verified in useAuthSubmit", verified);

    const handleSubmit = (e) => {
        //console.log("history in useAuthSubmit", history);
        e.preventDefault();

        if (!verified) {
            console.log("verified is false!!!");
            setError("verified");
            history.push("/apply");
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
                    history.push("/");
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
