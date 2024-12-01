import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";

import { Container } from "react-bootstrap";


export default function PlayerStats() {
    
    const { playerName } = useParams();

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName);

    return (
        <div className="playerstats">
            <p>This is stats for {playerName}!</p>
            <Container>
            { playerInfo.map(match => {
                return (
                    <MatchInfoBox matchDetails={match} />
                )
            })

            }

            <p>Total amount of games so far: {playerInfo.length}</p>
        </Container>

        </div>
    )
}