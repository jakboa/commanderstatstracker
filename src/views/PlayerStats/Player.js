import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function PlayerStats() {

    const { playerName } = useParams();

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName);

    const [matchResultsForPlayer] = useState(SearchHandler.getEntityResults(playerName,playerInfo));

    const totalGames = playerInfo.length;

    return (
        <Row className="playerstats">
            <Col md={12}>
                <h1>This is stats for {playerName}!</h1>
            </Col>

            <Col md={3} className="border border-4 border-black">
                <p>Here is picture of avatar</p>
                <p>Here are some facts?</p>
            </Col>

            <Col >
                <Row>
                    <Col>
                        <p>Total amount of games so far: {totalGames}</p>
                        <EntityScore results={ matchResultsForPlayer } totalGames={ totalGames } />
                    </Col>
                    <Col>
                        <DoughnutChart /> 
                    </Col>
                    <Col md={12}>
                        <LineChart entityName={ playerName } entityMatches={ playerInfo } />
                    </Col>
                </Row>
            </Col>
            <Col md={12}>
                <MatchInfoBox matchDetails={playerInfo} />
            </Col>

                


        </Row>
    )
}