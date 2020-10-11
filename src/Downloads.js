import React from "react";

export default function Downloads() {
    return (
        <div>
            <div>
                <img src="./logo.jpg" alt="starter image" className="bgImg" />
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
