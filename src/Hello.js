import React from "react";

import { data } from "./data.json";

export default function Hello() {
    return (
        <div>
            <img src="./logo.jpg" alt="starter image" className="bgImg" />
            <div className="start">
                <div className="wrapper title">
                    <h2>{data[0].nummer} Al-Anon Treffen in Deutschland</h2>
                    <h3>
                        mit AA-Beteiligung. Deutsch- und englischsprachige
                        Meetings.
                    </h3>
                    <h1>{data[0].thema}</h1>
                </div>
            </div>
        </div>
    );
}
