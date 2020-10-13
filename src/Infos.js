import React from "react";

import data from "./data.json";
//{data[0].nummer}
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

export default function Infos() {
    return (
        <div>
            <img src="./.jpg" alt="starter image" className="smImg" />
            <div className="container">
                <div className="card">
                    <h2 className="uberschrift2">
                        <FormattedMessage id="programm1" />
                    </h2>
                </div>
                <div id="profileInfo">
                    <span className="text">
                        <FormattedMessage id="programm2" />
                    </span>
                    <div>
                        <h3 className="uberschrift3">
                            <FormattedMessage id="freitag" />
                        </h3>
                        <span className="text">
                            <FormattedMessage id="textFreitag" />
                        </span>
                    </div>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="samstag" />
                    </h3>
                    <p className="text">
                        <FormattedMessage id="textSamstag" />
                    </p>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="sonntag" />
                    </h3>
                    <p className="text">
                        <FormattedMessage id="textSonntag" />
                    </p>
                    <div className="card">
                        <h2 className="uberschrift2">
                            <FormattedMessage id="meetings" />
                        </h2>
                    </div>
                    <p className="text">
                        <FormattedMessage id="meetingsText" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="alateen" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="ek" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="mann" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="frau" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="sonnen" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="morgen" />
                    </p>
                    <div className="card">
                        <h2 className="uberschrift2">
                            <FormattedMessage id="ein" />
                        </h2>
                    </div>
                    <p className="text">
                        <FormattedMessage id="einText" />
                    </p>
                </div>
            </div>
            <div className="logistik container">
                <div className="card">
                    <h2 className="uberschrift2">
                        <FormattedMessage id="hotel" />
                    </h2>
                </div>
                <div id="profileInfo">
                    <p className="text">
                        <FormattedMessage id="straße" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="ort" />
                    </p>
                    <div className="card">
                        <h2 className="uberschrift2">
                            <FormattedMessage id="an" />
                        </h2>
                    </div>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="bahn" />
                    </h3>
                    <p className="text">
                        <FormattedMessage id="bahnText" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="kitz" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="ip" />
                    </p>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="auto" />
                    </h3>
                    <p className="text">
                        <FormattedMessage id="textAuto" />
                    </p>
                </div>
            </div>
            <div className="preise container">
                <div className="card">
                    <h2 className="uberschrift2">
                        <FormattedMessage id="preise" />
                    </h2>
                </div>
                <div id="profileInfo">
                    <p className="text">
                        <FormattedMessage id="preiseText" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="ez" />
                    </p>
                    <p className="preis">
                        <FormattedMessage id="ezp" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="ezd" />
                    </p>
                    <p className="preis">
                        <FormattedMessage id="ezdp" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="dz" />
                    </p>
                    <p className="preis">
                        <FormattedMessage id="dzp" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="dzd" />
                    </p>
                    <p className="preis">
                        <FormattedMessage id="dzdp" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="gText" />
                    </p>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="angebot" />
                    </h3>
                    <p className="preis">
                        <FormattedMessage id="angebotText" />
                    </p>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="kind" />
                    </h3>
                    <p className="preis">
                        <FormattedMessage id="kindText" />
                    </p>
                    <h3 className="uberschrift3">
                        <FormattedMessage id="storno" />
                    </h3>
                    <p className="preis">
                        <FormattedMessage id="stornoText" />
                    </p>
                </div>
            </div>
            <div className="container">
                <div id="profileInfo">
                    <div className="card">
                        <h2 className="uberschrift2">
                            <FormattedMessage id="buchung" />
                        </h2>
                    </div>

                    <span className="preis">
                        <FormattedMessage id="buchungTextFett" />
                    </span>
                    <span className="text">
                        <FormattedMessage id="buchungText" />
                    </span>

                    <div className="card">
                        <h2 className="uberschrift2">
                            <FormattedMessage id="konto" />
                        </h2>
                    </div>
                    <p className="text">
                        <FormattedMessage id="ke" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="kn" />
                    </p>
                    <p className="text">
                        <FormattedMessage id="bic" />
                    </p>
                </div>
            </div>

            <img src="./24.jpg" alt="starter image" className="smImg" />
        </div>
    );
}
