import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            code: "",
            newPassword: "",
            currentDisplay: 1,
            error: false,
        };
    }

    handleReset(e, field) {
        //to see everything I am typing in because input is stored in event-object */

        //console.log("e.target.value: ", e.target.value);

        //*store value in state */
        this.setState(
            {
                [field]: e.target.value,
            },
            () => {
                console.log("this.state in handleReset", this.state);
            }
        );
    }

    handleSubmitReset(e) {
        console.log("submit was hit!!!!", this.state);
        e.preventDefault();
        if (this.state.email === "") {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            console.log(
                "everything worked out well in Login, doing axios now!!!!"
            );
            console.log("this.state in else Login", this.state);
            axios
                .post("/reset", {
                    email: this.state.email,
                })
                .then((resp) => {
                    console.log("login post worked!!!!");
                    console.log("resp in login", resp.data.successCode);

                    //data: userId: 8, success: true
                    if (resp.data.successCode === false) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        console.log("user exists. email was send");
                        this.setState({
                            currentDisplay: 2,
                        });
                    }
                });
        }
    }

    handleSubmitCode(e) {
        console.log("submit code was hit!!!!", this.state);
        e.preventDefault();
        if (this.state.newPassword === "" || this.state.code === "") {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            console.log(
                "everything worked out well in submit Code, doing axios now!!!!"
            );
            console.log("this.state in else Login", this.state);
            axios
                .post("/code", {
                    code: this.state.code,
                    email: this.state.email,
                    newPassword: this.state.newPassword,
                })
                .then((resp) => {
                    console.log("code post worked!!!!");

                    console.log("resp in post code", resp.data.success);

                    //data: userId: 8, success: true
                    if (resp.data.success === false) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        this.setState({
                            currentDisplay: 3,
                        });
                    }
                });
        }
    }

    render() {
        let elem;
        if (this.state.currentDisplay == 1) {
            console.log("current display is one!!!!");
            elem = (
                <div>
                    <h3>Reset Password:</h3>

                    {this.state.error && (
                        <p className="error">
                            Something went wrong, please try again!
                        </p>
                    )}
                    <form
                        onSubmit={(e) => this.handleSubmitReset(e)}
                        method="POST"
                    >
                        <label htmlFor="email">
                            Please enter the email adress with which you
                            registered
                        </label>
                        <input
                            onChange={(e) => this.handleReset(e, "email")}
                            name="email"
                            placeholder="email address"
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
        if (this.state.currentDisplay == 2) {
            console.log("current display is two!!!!");

            elem = (
                <div>
                    <h3>Current Display 2:</h3>

                    {this.state.error && (
                        <p className="error">
                            Something went wrong, please try again!
                        </p>
                    )}
                    <form
                        onSubmit={(e) => this.handleSubmitCode(e)}
                        method="POST"
                    >
                        <label htmlFor="code">
                            Please enter the Code which you received via mail
                        </label>
                        <input
                            onChange={(e) => this.handleReset(e, "code")}
                            name="code"
                            placeholder="Code"
                        />
                    </form>
                    <form
                        onSubmit={(e) => this.handleSubmitCode(e)}
                        method="POST"
                    >
                        <label htmlFor="newPassword">
                            Please enter the Code which you received via mail
                        </label>
                        <input
                            onChange={(e) => this.handleReset(e, "newPassword")}
                            name="newPassword"
                            placeholder="newPassword"
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
        if (this.state.currentDisplay == 3) {
            console.log("current display is three!!!!");
            elem = (
                <div>
                    <h3>Success!!!</h3>
                    <Link to="/login">
                        You can now login with you new Password!
                    </Link>
                </div>
            );
        }
        return (
            <div>
                <h3>THIS IS WHAT I ALWAYS WANT TO SHOW</h3>
                {elem}
            </div>
        );
    }
}
