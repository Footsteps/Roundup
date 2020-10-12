import React from "react";
import axios from "./axios";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";
import { Link } from "react-router-dom";

export default function Registration() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/register", value);

    console.log("errr", error);

    return (
        <div>
            <h1>Willkommen zur Anmeldung fürs Chatboard!</h1>
            <img id="logoWelcome" src="./logo.jpg" />

            <div className="register box">
                <form>
                    <h3>Register here:</h3>

                    {error === "email" && (
                        <div>Sorry, email adress already exists!</div>
                    )}
                    {error === "other" && (
                        <div>Sorry, something went wrong!</div>
                    )}

                    <div className="input-container">
                        <div className="registerField">
                            <label htmlFor="first">Enter your first name</label>
                            <input
                                onChange={handleChange}
                                name="first"
                                placeholder="first"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="last">Enter your last name</label>
                            <input
                                onChange={handleChange}
                                name="last"
                                placeholder="last"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="email">
                                Enter your email adress
                            </label>
                            <input
                                onChange={handleChange}
                                name="email"
                                placeholder="email"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="password">
                                Enter your password
                            </label>
                            <input
                                onChange={handleChange}
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>submit</button>
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
