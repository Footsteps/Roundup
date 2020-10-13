import React from "react";
import axios from "./axios";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Registration() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/register", value);

    console.log("errr", error);

    return (
        <div>
            <h1>
                <FormattedMessage id="REGISTER" />
            </h1>
            <img id="logoWelcome" src="./logo.jpg" />

            <div className="register box">
                <form>
                    {error === "email" && (
                        <div>Sorry, email adress already exists!</div>
                    )}
                    {error === "other" && (
                        <div>Sorry, something went wrong!</div>
                    )}

                    <div className="input-container">
                        <div className="registerField">
                            <label htmlFor="first">
                                <FormattedMessage id="first" />
                            </label>
                            <input
                                onChange={handleChange}
                                name="first"
                                placeholder="first"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="last">
                                <FormattedMessage id="last" />
                            </label>
                            <input
                                onChange={handleChange}
                                name="last"
                                placeholder="last"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="email">E-Mail</label>
                            <input
                                onChange={handleChange}
                                name="email"
                                placeholder="email"
                                type="text"
                            />
                        </div>
                        <div className="registerField">
                            <label htmlFor="password">
                                <FormattedMessage id="password" />
                            </label>
                            <input
                                onChange={handleChange}
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>
                        <FormattedMessage id="send" />
                    </button>
                </form>
            </div>
            <div className="nav">
                <p>
                    <Link to="/infos">INFOS</Link>
                </p>
                <p>
                    <Link to="/downloads">FLYER / MEETING SCHEDULE</Link>
                </p>
                <p>
                    <Link to="/apply">
                        <FormattedMessage id="BOOKING" />
                    </Link>
                </p>
                <p>
                    <Link to="/register">
                        <FormattedMessage id="CREATE AN ACCOUNT" />
                    </Link>
                </p>
                <p>
                    <Link to="/login">LOGIN</Link>
                </p>
            </div>
        </div>
    );
}
