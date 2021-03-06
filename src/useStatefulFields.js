//src/useStatefulFields.js
/*
this hook will work for all input fields

returns 2 things:
- object value, that includes all the things we collected from the input fields
- handleChange function

//setValue erases everything that was there 
we need to tell it to remember the previous state and add the new stuff
--> ...value,
the spread operator copies. it copies the old state object and than add the new key-value-pair
*/

import React, { useState } from "react";

export function useStatefulFields(dataWelcomeToApply) {
    const [value, setValue] = useState({});

    //console.log("dataWelcomeToApply", dataWelcomeToApply);
    //console.log("browser language", navigator.languages);

    const handleChange = (e) => {
        e.preventDefault();
        setValue({
            ...value,
            [e.target.name]: e.target.value,
            language: dataWelcomeToApply,
        });
    };
    //console.log("value4", value);

    return [value, handleChange];
}
