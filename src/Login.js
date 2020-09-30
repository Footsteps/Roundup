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
        <form>
            {error && <div>oops</div>}
            <input
                onChange={handleChange}
                name="email"
                placeholder="email"
                type="text"
            />
            <input
                onChange={handleChange}
                name="password"
                placeholder="password"
                type="password"
            />
            <button onClick={handleSubmit}>submit</button>
            <Link to="/reset">Click here to reset your password</Link>
        </form>
    );
}
