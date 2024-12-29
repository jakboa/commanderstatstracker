import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import SingleCommanderInfoWindow from "./SingleCommanderInfoWindow";
import YearSelector from "../../components/YearSelector";

import "./CommanderStats.css"

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";


export default function SingleCommanderStats() {

    // useStates 
    const [year, setYear] = useState("allMatches");

    // Derived Values
    const { commanderName } = useParams();

    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const filteredMatches = SearchHandler.getEntityMatchesForYear(commanderInfo,year);
    const matchResultsForCommander= SearchHandler.getEntityResults(commanderName,commanderInfo);
   
    const totalGames = filteredMatches.length; 

    // Functions
    const handleFilterMatches = (e) =>{
        setYear(e);
    };


    return (
        <Row className="singleCommanderPage">
            {/* Name and Banner */}
            <Col md={12} className="bg-info-subtle" style={{height:"5rem"}}  >
                <Row className="h-100">
                    <Col>
                        <h1>{commanderName}</h1>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                        <div>
                        <YearSelector matches={ commanderInfo } handleFilterMatches={handleFilterMatches} />
                        </div>
                    </Col>
                </Row>
            </Col>

            {/* Small InfoBox */}
            <Col md={3} className="d-flex justify-content-center text-center ">
                <SingleCommanderInfoWindow />
            </Col>

            {/* Graphs and Info */}
            <Col md={9}>
                <Row className="m-3">
                    <Col md={4} className="d-flex flex-column text-center">
                        <p className="bg-light border rounded">Played a total of { totalGames } times!</p>
                        <EntityScore results={ matchResultsForCommander } totalGames={ totalGames } />
                    </Col>
                    <Col md={8} style={{height:"20rem"}} >
                        <DoughnutChart results={ matchResultsForCommander } />
                    </Col>
                </Row>

                {/* Line Chart */}
                <Row className="m-3" >
                    <Col className=" d-flex align-items-stretch justify-content-center" style={{height:"13rem"}}  >
                        <LineChart entityName={ commanderName } entityMatches={ commanderInfo } />
                    </Col>
                </Row>
            </Col>

            {/* Games Played and Results */}
            <Col md={12} className="border border-5 border-black round-end">
                <MatchInfoBox matchDetails={ commanderInfo } focus={ commanderName } />
            </Col>
        </Row>

    )
}




