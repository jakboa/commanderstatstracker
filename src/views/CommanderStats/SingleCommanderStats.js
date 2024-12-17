import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import Container  from "react-bootstrap/Container";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";

export default function SingleCommanderStats() {

    const { commanderName } = useParams();
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const [ matchResultsForCommander ] = useState(SearchHandler.getEntityResults(commanderName,commanderInfo))
    
    return (
        <Container>
            <p>{commanderName}</p>
            <MatchInfoBox matchDetails={ commanderInfo } />
            <EntityScore results={ matchResultsForCommander } totalGames={ commanderInfo.length } />
            <LineChart entityName={ commanderName } entityMatches={ commanderInfo } />
        </Container>

    )
}




