import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import Container  from "react-bootstrap/Container";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";

export default function SingleCommanderStats() {

    const { commanderName } = useParams();
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);

    return (
        <Container>
            <p>{commanderName}</p>
            <MatchInfoBox matchDetails={ commanderInfo } />
        </Container>

    )
}




