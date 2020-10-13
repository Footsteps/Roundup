import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";
import { FormattedMessage } from "react-intl";

export default function Login() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", value);

    return (
        <div className="heading_form">
            <h1>
                <FormattedMessage id="LOGIN" />
            </h1>
            <form className="loginbox">
                {error && <div>Sorry, something went wrong!</div>}
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} name="email" type="text" />

                    <label htmlFor="password">
                        <FormattedMessage id="password" />
                    </label>
                    <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                    />
                    <button onClick={handleSubmit} className="btn">
                        <FormattedMessage id="send" />
                    </button>
                </div>

                <div className="resetLink">
                    <Link to="/reset">
                        <FormattedMessage id="reset" />
                    </Link>
                </div>
            </form>
            <img id="logoWelcome" src="./24.jpg" />
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
