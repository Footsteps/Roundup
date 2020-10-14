import React, { useState, useEffect } from "react";
import de from "./translations/de.json";
import en from "./translations/en.json";

export function useChooseLanguage() {
    const defaultValue = navigator.language.split(/[-_]/)[0];
    console.log(defaultValue);

    const [language, setLanguage] = useState(defaultValue);

    useEffect(() => {
        console.log("language in useeffect", language);
    }, [language]);

    const handleLanguage = (e) => {
        console.log("this language has been clicked: ", e.target.id);
        setLanguage(e.target.id);
        //console.log("language");
    };
    return [language, handleLanguage];
}
