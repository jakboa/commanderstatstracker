import React from "react";
import MatchInfoSingle from "./MatchInfoSingle_copy";
import "./MatchInfoBox_copy.css";

import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";


export default function MatchInfoBox( { matchDetails, focus } ) {

    // Here i sort the order in the match so that first place is displayed first and so on.
    // I use .forEach because I want to modify the original. Could be smart to use .map, need more research.
    matchDetails.forEach(match => match.results.sort((a, b) => a.placement - b.placement));

    const getFocus = focus ? focus : "";

    return (
        <Row>
            { matchDetails.map((match, index) => {
                return (
                    <Col key={index} md={6} className="mb-3">
                        <h1>DATABASE MATCHES!</h1>
                        <div className="d-flex justify-content-center align-items-center mt-1">
                            <p className="border border-bottom-0 border-4 rounded-top mb-0 px-2 fw-semibold bg-body-tertiary">Match nr. {index+1}</p>
                        </div>
                        <div className="border rounded-5 border-4 overflow-hidden">    
                            { match.results.map((results, index) => {
                                return (
                                    <MatchInfoSingle matchData={results} show={getFocus} key={index} />
                                )})
                            }
                        </div>
                    </Col>
            )})}
        </Row>
    );
};