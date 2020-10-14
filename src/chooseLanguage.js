import React, { useState } from "react";

export function chooseLanguage() {
    const [language, setLanguage] = useState({});

    //console.log("browser language", navigator.languages);

    const handleLanguage = (e) => {
        console.log("e.target.value in handleLanguage", e.target.value);
    };
    //console.log("value4", value);
    return [language, handleLanguage];
}
