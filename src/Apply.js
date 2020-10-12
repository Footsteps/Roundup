import React from "react";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";
import { Link } from "react-router-dom";

export default function Apply() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/apply", value);

    return (
        <div>
            <h1>Herzlich Willkommen! Wie schön! Wir freuen uns auf Dich!</h1>
            <img id="logoApply" src="./11.jpg" />
            <div className="register box apply">
                <form>
                    <div className="input-container">
                        <div className="registerField">
                            <label htmlFor="first">
                                Vorname
                                <input
                                    onChange={handleChange}
                                    name="first"
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label htmlFor="first">
                                Nachname
                                <input
                                    onChange={handleChange}
                                    name="last"
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label htmlFor="first">
                                E-Mail-Adresse
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Abendessen Freitag Abend
                                <input
                                    name="freitagA"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Samstag Frühstück
                                <input
                                    name="samstagF"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Samstag Mittagessen
                                <input
                                    name="samstagM"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Samstag Abendessen
                                <input
                                    name="samstagA"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Sonntag Frühstück
                                <input
                                    name="sonntagF"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Sonntag Mittagessen
                                <input
                                    name="sonntagM"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Sonderkost
                                <input
                                    name="specialFood"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Yoga
                                <input
                                    name="yoga"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Bringst du etwas zum bunten Abend mit?
                                <input
                                    name="party"
                                    type="checkbox"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className="registerField">
                            <label>
                                Gibt es sonst noch etwas zu sagen?
                                <textarea
                                    name="message"
                                    placeholder="Add your message here"
                                    onChange={handleChange}
                                ></textarea>
                            </label>
                        </div>

                        <button onClick={handleSubmit}>Abschicken</button>
                    </div>
                </form>
            </div>
            <div className="nav">
                <p>
                    <Link to="/infos">INFOS</Link>
                </p>
                <p>
                    <Link to="/downloads">DOWNLOADS</Link>
                </p>
                <p>
                    <Link to="/apply">ANMELDEN</Link>
                </p>
                <p>
                    <Link to="/register">KONTO ANLEGEN</Link>
                </p>
                <p>
                    <Link to="/login">LOGIN</Link>
                </p>
            </div>
        </div>
    );
}
