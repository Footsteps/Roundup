import React from "react";

export default function Downloads() {
    return (
        <div>
            <div>
                <img src="./logo.jpg" alt="starter image" className="bgImg" />
                <div className="start">
                    <div className="wrapper title">
                        <h2>Downloads</h2>
                        <a href="./Flyer_2020.pdf" download>
                            Download Flyer 2020
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
