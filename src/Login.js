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
        <div className="box" id="login">
            <form>
                {error && <div>Sorry, something went wrong!</div>}
                <div className="input-container">
                    <div className="loginField">
                        <label htmlFor="email">Enter your email adress</label>
                        <input
                            onChange={handleChange}
                            name="email"
                            placeholder="email"
                            type="text"
                        />
                    </div>
                    <div className="loginField">
                        <label htmlFor="password">Enter your password</label>
                        <input
                            onChange={handleChange}
                            name="password"
                            placeholder="password"
                            type="password"
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>submit</button>
                <Link to="/reset">Click here to reset your password</Link>
            </form>
        </div>
    );
}
