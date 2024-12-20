import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";


export default function SingleCommanderStats() {

    const { commanderName } = useParams();
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const [ matchResultsForCommander ] = useState(SearchHandler.getEntityResults(commanderName,commanderInfo))
    
    return (
        <Row>
            <Col md={12}>
                <p>{commanderName}</p>
            </Col>
            <Col md={4} >
                <p>Her er commander info.</p>
                <p>INSERT INFO HERE:</p>
            </Col>
            <Col md={8}>
                <Row className="border border-4 border-black">
                    <Col md={3} className="border border-5 border-white bg-light-subtle p-3 m-3 rounded-5">
                        <EntityScore results={ matchResultsForCommander } totalGames={ commanderInfo.length } />
                    </Col>
                    <Col md={8} className="border border-5 border-white bg-light-subtle p-3 m-3 rounded-5">
                        <DoughnutChart />
                    </Col>
                    <Col md={11} className="border border-5 border-white bg-light-subtle p-3 m-3 rounded-5">
                        <LineChart entityName={ commanderName } entityMatches={ commanderInfo } />
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="border border-5 border-black round-end">
                <MatchInfoBox matchDetails={ commanderInfo } />
            </Col>
        </Row>

    )
}




