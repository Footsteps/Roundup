import React from "react";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Apply() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/apply", value);

    return (
        <div>
            <h1>Herzlich Willkommen! Wie schön! Wir freuen uns auf Dich!</h1>

            <form>
                <div>
                    <div>
                        <label htmlFor="first">
                            Vorname
                            <input
                                onChange={handleChange}
                                name="first"
                                type="text"
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="first">
                            Nachname
                            <input
                                onChange={handleChange}
                                name="last"
                                type="text"
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="first">
                            E-Mail-Adresse
                            <input
                                onChange={handleChange}
                                name="email"
                                type="text"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Abendessen Freitag Abend
                            <input
                                name="freitagA"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Samstag Frühstück
                            <input
                                name="samstagF"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Samstag Mittagessen
                            <input
                                name="samstagM"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Samstag Abendessen
                            <input
                                name="samstagA"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Sonntag Frühstück
                            <input
                                name="sonntagF"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Sonntag Mittagessen
                            <input
                                name="sonntagM"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Sonderkost
                            <input
                                name="specialFood"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Yoga
                            <input
                                name="yoga"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Bringst du etwas zum bunten Abend mit?
                            <input
                                name="party"
                                type="checkbox"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Gibt es sonst noch etwas zu sagen?
                            <textarea
                                name="message"
                                placeholder="Add your message here"
                                onChange={handleChange}
                            ></textarea>
                        </label>
                    </div>
                </div>
                <button onClick={handleSubmit}>Abschicken</button>
            </form>
        </div>
    );
}
