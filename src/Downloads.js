import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Downloads() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <div className="header">
                        <div className="link">
                            <Link to="/infos">INFOS</Link>
                        </div>

                        <div className="link">
                            <Link to="/downloads">FLYER</Link>
                        </div>
                        <div className="link">
                            <Link to="/apply">ANMELDUNG</Link>
                        </div>
                        <div className="link">
                            <Link to="/register">REGISTER</Link>
                        </div>
                        <div className="link">
                            <Link to="/login">LOGIN</Link>
                        </div>
                    </div>
                    <div>
                        <img
                            src="./logo.jpg"
                            alt="starter image"
                            className="bgImg"
                        />
                        <div className="start">
                            <div className="wrapper title">
                                <a
                                    href={`${process.env.PUBLIC_URL}/Flyer_2020.pdf`}
                                    download
                                ></a>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}
