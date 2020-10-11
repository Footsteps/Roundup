import React from "react";
import axios from "./axios";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Apply() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/apply", value);
    const [checked, handleCheckbox] = useCheckbox();

    console.log("errr", error);

    return (
        <div>
            <h1>Herzlich Willkommen! Wie schön! Wir freuen uns auf Dich!</h1>
            <img id="logoWelcome" src="./logo.jpg" />

            <div className="register box">
                <form>
                    <h3>Anmeldung für das Wochenende:</h3>

                    {error === "email" && (
                        <div>Sorry, email adress already exists!</div>
                    )}
                    {error === "other" && (
                        <div>Sorry, something went wrong!</div>
                    )}

                    <div className="input-container">
                        <div className="registerField">
                            <label htmlFor="first">Vorname</label>
                            <input
                                onChange={handleChange}
                                name="first"
                                placeholder="first"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="last">
                                1. Buchstabe des Nachnamens
                            </label>
                            <input
                                onChange={handleChange}
                                name="last"
                                placeholder="last"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="email">E-Mail-Adresse</label>
                            <input
                                onChange={handleChange}
                                name="email"
                                placeholder="email"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label>
                                Freitag:
                                <input type="checkbox">
                                    <option value="freitagA">
                                        Freitag Abendessen
                                    </option>
                                    <option value="samstagF">
                                        Samstag - Frühstück
                                    </option>
                                    <option value="samstagM">
                                        Samstag - Mittagessen
                                    </option>
                                    <option value="samstagA">
                                        Samstag - Abendessen
                                    </option>
                                    <option value="sonntagF">
                                        Sonntag - Frühstück
                                    </option>
                                    <option value="sonntagM">
                                        Sonntag - Mittagessen
                                    </option>
                                </input>
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>submit</button>
                </form>
            </div>
        </div>
    );
}
