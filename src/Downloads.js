import React from "react";
import { Link } from "react-router-dom";

export default function Downloads() {
    return (
        <div>
            <div>
                <img src="./logo.jpg" alt="starter image" className="bgImg" />
                <div className="nav">
                    <p>
                        <Link to="/infos">INFOS</Link>
                    </p>
                    <p>
                        <Link to="/downloads">DOWNLOADS</Link>
                    </p>
                    <p>
                        <Link to="/apply">ANMELDEN</Link>
                    </p>
                    <p>
                        <Link to="/register">KONTO ANLEGEN</Link>
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
                                Download Flyer 2020 - Thema: Expect Miracles
                            </a>
                        </div>
                        <div>
                            <a href="./Flyer_2021.pdf" download>
                                Download Flyer 2021 - Thema: Liebe in Taten
                                umsetzen
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
