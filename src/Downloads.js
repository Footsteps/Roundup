import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Downloads() {
    return (
        <div>
            <div>
                <img src="./20.jpg" alt="starter image" className="bgImg" />
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
                <div className="start">
                    <div className="wrapper title">
                        <h2>Downloads</h2>
                        <div>
                            <a href="./Flyer_2020.pdf" download>
                                Download Flyer 2020 - Thema: Erwarte Wunder -
                                deutsch
                            </a>
                        </div>
                        <div>
                            <a href="./Flyer_2021.pdf" download>
                                Download Flyer 2021 - Thema: Liebe in Taten
                                umsetzen - deutsch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
