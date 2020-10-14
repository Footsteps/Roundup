import React, { useState } from "react";

export function chooseLanguage() {
    const [language, setLanguage] = useState("");

    const handleLanguage = (e) => {
        console.log("this language has been clicked: ", e.target.id);
        setLanguage(e.target.id);
        console.log("language", language);
    };
    return [language, handleLanguage];
}
