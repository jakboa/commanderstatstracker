import React from "react";
import MatchInfoSingle from "./MatchInfoSingle";

import Row from 'react-bootstrap/Row';


export default function MatchInfoBox( { matchDetails } ) {

    matchDetails.players.sort((a, b) => a.placement - b.placement);
    console.log(matchDetails);

    return (
        <Row>
        { matchDetails.players.map(results => {
            return (
                <MatchInfoSingle matchData={results} />
            )})
            }
        </Row>
    );
};