import React from "react";

import { Link } from "react-router-dom";

import data from "./data.json";
//{data[0].nummer}

export default function Infos() {
    return (
        <div>
            <div>
                <img src="./logo.jpg" alt="starter image" className="smImg" />
                <div>
                    <div>
                        <h2>Infos</h2>
                        <div className="generell">
                            <h2 className="uberschrift2">
                                {data[1].programm1}
                            </h2>
                            <span className="text">{data[1].programm2}</span>
                            <div>
                                <span className="uberschrift3">
                                    {data[1].freitag}
                                </span>
                                <span className="text">
                                    {data[1].textFreitag}
                                </span>
                            </div>
                            <span className="uberschrift3">
                                {data[1].samstag}
                            </span>
                            <p className="text">{data[1].textSamstag}</p>
                            <h3 className="uberschrift3">{data[1].sonntag}</h3>
                            <p className="text">{data[1].textSonntag}</p>
                            <h2 className="uberschrift2">{data[2].meetings}</h2>
                            <p className="text">{data[2].meetingsText}</p>
                            <p className="text">{data[2].alateen}</p>
                            <p className="text">{data[2].ek}</p>
                            <p className="text">{data[2].mann}</p>
                            <p className="text">{data[2].frau}</p>
                            <p className="text">{data[2].sonnen}</p>
                            <p className="text">{data[2].morgen}</p>
                            <h2 className="uberschrift2">{data[3].ein}</h2>
                            <p className="text">{data[3].einText}</p>
                        </div>
                        <div className="logistik">
                            <h2 className="uberschrift2">{data[3].hotel}</h2>
                            <p className="text">{data[0].straße}</p>
                            <p className="text">{data[0].ort}</p>
                            <h2 className="uberschrift2">{data[3].an}</h2>
                            <h3 className="uberschrift3">{data[3].bahn}</h3>
                            <p className="text">{data[3].bahnText}</p>
                            <p className="text">{data[3].kitz}</p>
                            <p className="text">{data[3].ip}</p>
                            <h3 className="uberschrift3">{data[3].auto}</h3>
                            <p className="text">{data[3].textAuto}</p>
                        </div>
                        <div className="preise">
                            <h2 className="uberschrift2">{data[4].preise}</h2>
                            <p className="text">{data[4].preiseText}</p>
                            <p className="text">{data[4].ez}</p>
                            <p className="preis">{data[4].ezp}</p>
                            <p className="text">{data[4].ezd}</p>
                            <p className="preis">{data[4].ezdp}</p>
                            <p className="text">{data[4].dz}</p>
                            <p className="preis">{data[4].dzp}</p>
                            <p className="text">{data[4].dzd}</p>
                            <p className="preis">{data[4].dzdp}</p>
                            <p className="text">{data[4].gText}</p>
                            <h3 className="uberschrift3">{data[4].angebot}</h3>
                            <p className="preis">{data[4].angebotText}</p>
                            <h3 className="uberschrift3">{data[4].kind}</h3>
                            <p className="preis">{data[4].kindText}</p>
                            <h3 className="uberschrift3">{data[4].storno}</h3>
                            <p className="preis">{data[4].stornoText}</p>
                        </div>
                        <div className="buchung">
                            <h2 className="uberschrift2">{data[5].buchung}</h2>
                            <span className="preis">
                                {data[5].buchungTextFett}
                            </span>
                            <span className="text">{data[5].buchungText}</span>
                        </div>
                        <div className="konto">
                            <h2 className="uberschrift2">{data[5].konto}</h2>
                            <p className="text">{data[5].ke}</p>
                            <p className="text">{data[5].kn}</p>
                            <p className="text">{data[5].bic}</p>
                        </div>
                    </div>
                </div>
                <img src="./logo.jpg" alt="starter image" className="smImg" />
            </div>
        </div>
    );
}
