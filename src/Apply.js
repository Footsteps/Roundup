import React from "react";

import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

//recaptcha stuff
import Recaptcha from "react-google-recaptcha";

export default function Apply({ dataWelcomeToApply, register }) {
    //console.log("dataWelcomeToApply", dataWelcomeToApply);
    //console.log("register in Aplly", register);

    const [value, handleChange] = useStatefulFields(dataWelcomeToApply);
    const [error, handleSubmit] = useAuthSubmit("/apply", value, register);

    return (
        <div>
            <h1>
                <FormattedMessage id="Ü_apply" />
            </h1>
            <div className="test">
                <img id="logoApply" src="./11.jpg" />
                <div className="box apply">
                    <form>
                        {error === "email" && (
                            <div>
                                <FormattedMessage id="errorEmail" />
                            </div>
                        )}
                        {error === "other" && (
                            <div>
                                <FormattedMessage id="errorOther" />
                            </div>
                        )}
                        <div className="input-container">
                            <div className="test">
                                <div className="registerField">
                                    <label htmlFor="first">
                                        <FormattedMessage id="first" />
                                        <input
                                            onChange={handleChange}
                                            name="first"
                                            type="text"
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label htmlFor="first">
                                        <FormattedMessage id="last" />
                                        <input
                                            onChange={handleChange}
                                            name="last"
                                            type="text"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="registerField">
                                <label htmlFor="email">
                                    E-Mail
                                    <input
                                        onChange={handleChange}
                                        name="email"
                                        type="text"
                                    />
                                </label>
                            </div>

                            <div className="registerField">
                                <label>
                                    <FormattedMessage id="freitagA" />
                                    <input
                                        name="freitagA"
                                        type="checkbox"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div className="test">
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="samstagF" />
                                        <input
                                            name="samstagF"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="samstagM" />
                                        <input
                                            name="samstagM"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="samstagA" />
                                        <input
                                            name="samstagA"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="test">
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="sonntagF" />
                                        <input
                                            name="sonntagF"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="sonntagN" />
                                        <input
                                            name="sonntagM"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="test">
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="specialFood" />
                                        <input
                                            name="specialFood"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="yoga" />
                                        <input
                                            name="yoga"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <div className="registerField">
                                    <label>
                                        <FormattedMessage id="party" />
                                        <input
                                            name="party"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="registerField">
                                <label>
                                    <FormattedMessage id="message" />
                                    <textarea
                                        className="messageApply"
                                        name="message"
                                        onChange={handleChange}
                                    ></textarea>
                                </label>
                            </div>

                            <button onClick={handleSubmit}>
                                <FormattedMessage id="send" />
                            </button>
                        </div>
                    </form>
                </div>
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
