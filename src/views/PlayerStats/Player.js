import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import YearSelector from "../../components/YearSelector";

import "./PlayerStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function PlayerStats() {

    const { playerName } = useParams();

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName);

    const [totalGames, setTotalGames] = useState(playerInfo.length);

    const [year,setYear] = useState("allMatches")
    const [filteredMatches, setFilteredMatches] = useState(SearchHandler.getEntityMatchesForYear(playerInfo,year))
    const [matchResultsForPlayer,setMatchResultsForPlayer ] = useState(SearchHandler.getEntityResults(playerName,playerInfo));
    

    const handleFilterMatches = (e) =>{
        setYear(e);
    };
    useEffect(() =>{
        setFilteredMatches(SearchHandler.getEntityMatchesForYear(playerInfo,year));
    },[playerInfo,year])

    useEffect(() =>{
        setMatchResultsForPlayer(SearchHandler.getEntityResults(playerName,filteredMatches));
        setTotalGames(filteredMatches.length);
    },[filteredMatches,playerName])

    return (
        <Row className="playerstats">

            {/* BANNER */}
            <Col md={12} className="d-inline-flex bg-info-subtle" style={{height:"5rem"}}>
                <h1>This is stats for {playerName}!</h1>
                <YearSelector years={year}  handleFilterMatches={handleFilterMatches} />
                <p>{year}</p>
            </Col>

            {/* INFO */}
            <Col md={3} className="d-flex justify-content-center">
                <div className="p-2 border border-white border-3 rounded-4 bg-light text-center m-2 w-100">
                    <p>Here is picture of avatar</p>
                    <p>Here are some facts?</p>
                </div>
            </Col>

            {/* STATS & GRAPH */}
            <Col className="text-center">
                <Row className=" my-2">

                    {/* STATS */}
                    <Col>
                        <div className="d-flex flex-column h-100">
                            <p className="border border-white rounded bg-light">Total amount of games so far: {filteredMatches.length}</p>
                            <EntityScore results={ matchResultsForPlayer } totalGames={ totalGames } />
                        </div>
                    </Col>

                    {/* DOUGHNUT */}
                    <Col md={7} style={{height:"22rem"}}>
                        <DoughnutChart results={ matchResultsForPlayer } /> 
                    </Col>
                </Row>
                
                {/* LINECHART */}
                <Row className=" my-2">
                    <Col>
                        <LineChart entityName={ playerName } entityMatches={ filteredMatches } />
                    </Col>
                </Row>
            </Col>

            {/* MATCHES */}
            <Col md={12} className="border-top border-black">
                <h1 className="text-center m-3">This is the matches for {playerName}</h1>
                <MatchInfoBox matchDetails={filteredMatches} focus={ playerName } />
            </Col>

        </Row>
    )
}