import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

import "./PlayerStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function PlayerStats() {

    const { playerName } = useParams();

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName);

    const [matchResultsForPlayer] = useState(SearchHandler.getEntityResults(playerName,playerInfo));

    const totalGames = playerInfo.length;

    return (
        <Row className="playerstats">

            {/* BANNER */}
            <Col md={12} className="bg-info-subtle" style={{height:"5rem"}}>
                <h1>This is stats for {playerName}!</h1>
            </Col>

            {/* INFO */}
            <Col md={3} className="d-flex justify-content-center border border-black">
                <div className="border border-3 bg-light text-center m-2">
                    <p>Here is picture of avatar</p>
                    <p>Here are some facts?</p>
                </div>
            </Col>

            {/* STATS & GRAPH */}
            <Col className="text-center">
                <Row>

                    {/* STATS */}
                    <Col>
                        <p className="border border-white rounded bg-light m-2">Total amount of games so far: {totalGames}</p>
                        <EntityScore results={ matchResultsForPlayer } totalGames={ totalGames } />
                    </Col>

                    {/* DOUGHNUT */}
                    <Col>
                        <DoughnutChart results={ matchResultsForPlayer } /> 
                    </Col>
                </Row>
                
                <Row>
                    {/* LINECHART */}
                    <Col>
                        <LineChart entityName={ playerName } entityMatches={ playerInfo } />
                    </Col>
                </Row>
            </Col>

            {/* MATCHES */}
            <Col md={12}>
                <MatchInfoBox matchDetails={playerInfo} focus={ playerName } />
            </Col>

        </Row>
    )
}