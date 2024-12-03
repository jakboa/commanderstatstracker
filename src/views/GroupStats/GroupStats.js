import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";

import Container from 'react-bootstrap/Container';

export default function GroupStats() {

    const { groupname } = useParams();

    const group = SearchHandler.getOneGroup(groupname);

    return (
        <Container>
            <p>Her er groupStats for {groupname}!</p>
            <MatchInfoBox matchDetails={group} />
            <p>Total amount of games so far: {group.length}</p>
            <p>This is the stats so far:</p>
            <GroupScore scoreInfo={group} />
        </Container>
    );
};

