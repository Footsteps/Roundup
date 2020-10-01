import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Registration() {
    //call imported hook-function
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/register", value);

    return (
        <div className="register box">
            <Link id="linkLogin" to="/login">
                Click here to login
            </Link>
            <form>
                <h3>Register here:</h3>
                {error && <div>Sorry, something went wrong!</div>}

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
                        <label htmlFor="email">Enter your email adress</label>
                        <input
                            onChange={handleChange}
                            name="email"
                            placeholder="email"
                            type="text"
                        />
                    </div>
                    <div className="registerField">
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
            </form>
        </div>
    );
}
