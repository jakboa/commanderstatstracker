import React from "react";
import MatchInfoSingle from "./MatchInfoSingle";
import "./MatchInfoBox.css";

import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";


export default function MatchInfoBox( { matchDetails } ) {

    // Here is sort the order in the match so that first place is displayed first and so on.
    // I use .forEach because I want to modify the original. Could be smart to use .map, need more research.
    matchDetails.forEach(match => match.players.sort((a, b) => a.placement - b.placement));

    return (
        <Row>
            { matchDetails.map(match => {
                return (
                    <Col md={6} className=" mb-3 border">
                    { match.players.map(results => {
                        return (
                            <MatchInfoSingle matchData={results} />
                        )})
                        }
                    </Col>
            )})}
        </Row>
    );
};