import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Login() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/login", value);

    return (
        <div className="heading_form">
            <h1>Login</h1>
            <form className="loginbox">
                {error && <div>Sorry, something went wrong!</div>}
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        placeholder="email"
                        type="text"
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        name="password"
                        placeholder="password"
                        type="password"
                    />
                    <button onClick={handleSubmit} className="btn">
                        submit
                    </button>
                </div>

                <div className="resetLink">
                    <Link to="/reset">Click here to reset your password</Link>
                </div>
            </form>
            <img id="logoWelcome" src="./logo.jpg" />
        </div>
    );
}
