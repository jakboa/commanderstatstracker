import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import SingleCommanderInfoWindow from "./SingleCommanderInfoWindow";

import "./CommanderStats.css"

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";


export default function SingleCommanderStats() {

    const { commanderName } = useParams();
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const [ matchResultsForCommander ] = useState(SearchHandler.getEntityResults(commanderName,commanderInfo))

    return (
        <Row className="singleCommanderPage">
            <Col md={12} className="bg-light" style={{height:"5rem"}}  >
                <h1>{commanderName}</h1>
            </Col>
            <Col md={3} className=" d-flex justify-content-center text-center">
                <SingleCommanderInfoWindow />
            </Col>

            <Col md={9}>
                <Row className="m-3">
                    <Col md={4} className="d-flex flex-column text-center">
                        <p className="bg-light border rounded">Played an amount of X times!</p>
                        <EntityScore results={ matchResultsForCommander } totalGames={ commanderInfo.length } />
                    </Col>
                    <Col md={8} style={{height:"20rem"}} >
                        <DoughnutChart results={ matchResultsForCommander } />
                    </Col>
                </Row>
                <Row className="m-3" >
                    <Col className=" d-flex align-items-stretch justify-content-center" style={{height:"13rem"}}  >
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




