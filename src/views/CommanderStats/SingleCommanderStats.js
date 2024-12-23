import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

import "./CommanderStats.css"

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";


export default function SingleCommanderStats() {

    const { commanderName } = useParams();
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const [ matchResultsForCommander ] = useState(SearchHandler.getEntityResults(commanderName,commanderInfo))
    
    return (
        <Row className="singleCommanderPage">
            <Col md={12}>
                <h1>{commanderName}</h1>
            </Col>
            <Col md={4} >
                <p>Her er commander info.</p>
                <p>INSERT INFO HERE:</p>
            </Col>
            <Col md={8}>
                <Row className="m-3">
                    <Col md={4} className="d-flex">
                        <EntityScore results={ matchResultsForCommander } totalGames={ commanderInfo.length } />
                    </Col>
                    <Col md={8} style={{height:"400px"}} >
                        <DoughnutChart />
                    </Col>
                </Row>
                <Row className="m-3" >
                    <Col className=" d-flex align-items-stretch justify-content-center" style={{height:"400px"}}  >
                        <LineChart entityName={ commanderName } entityMatches={ commanderInfo } />
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="border border-5 border-black round-end">
                <MatchInfoBox matchDetails={ commanderInfo } focus={ commanderName } />
            </Col>
        </Row>

    )
}




