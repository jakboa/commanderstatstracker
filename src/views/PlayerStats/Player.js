import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

import { Container } from "react-bootstrap";


export default function PlayerStats() {

    const { playerName } = useParams();

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName);

    const [matchResultsForPlayer] = useState(SearchHandler.getEntityResults(playerName,playerInfo));

    const totalGames = playerInfo.length;

    return (
        <div className="playerstats">
            <p>This is stats for {playerName}!</p>
            <Container>
                <MatchInfoBox matchDetails={playerInfo} />
                <p>Total amount of games so far: {totalGames}</p>
                <EntityScore results={ matchResultsForPlayer } totalGames={ totalGames } />
                <LineChart entityName={ playerName } entityMatches={ playerInfo } />
                <DoughnutChart /> 
            </Container>
        </div>
    )
}