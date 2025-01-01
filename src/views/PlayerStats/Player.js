import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import YearSelector from "../../components/YearSelector";
import CommanderCardContainer from "../../components/commanderCard/CommanderCardContainer";

import "./PlayerStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function PlayerStats() {

    // useStates
    const [year,setYear] = useState("allMatches");

    // Derived Values
    const { playerName } = useParams(); 

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName); 
    const filteredMatches = SearchHandler.getEntityMatchesForYear(playerInfo,year);
    const matchResultsForPlayer = SearchHandler.getEntityResults(playerName,playerInfo);
    const commanderCardInfo = SearchHandler.getCommanderCardsByPlayer(filteredMatches,playerName);
   
    const totalGames = filteredMatches.length; 

    // Functions
    const handleFilterMatches = (e) =>{
        setYear(e);
    };

    return (
        <Row className="playerstats">

            {/* BANNER */}
            <Col md={12} className="p-0 bg-info-subtle" style={{height:"7rem"}}>
                <Row className="h-100 w-100">
                    <Col md={6} className="d-flex align-items-center">
                        <h1 className="">Stats for {playerName}</h1>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end align-items-end">
                        <div >
                            <YearSelector  matches={ playerInfo } handleFilterMatches={handleFilterMatches} />
                        </div>
                    </Col>
                </Row>
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
                            <p className="border border-white rounded bg-light">Total amount of games so far: {totalGames}</p>
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

            {/* COMMANDERS */}
            <Col md={12}>
                <CommanderCardContainer commanderCardInfo={ commanderCardInfo } />
            </Col>

            {/* MATCHES */}
            <Col md={12} className="border-top border-black">
                <h1 className="text-center m-3">This is the matches for {playerName}</h1>
                <MatchInfoBox matchDetails={ filteredMatches } focus={ playerName } />
            </Col>

        </Row>
    )
}