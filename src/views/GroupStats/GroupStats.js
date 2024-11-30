import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";

import Container from 'react-bootstrap/Container';

export default function GroupStats() {

    const { groupname } = useParams();

    const group = SearchHandler.getOneGroup(groupname);

    return (
        <Container>
            <p>Her er groupStats for {groupname}!</p>
            { group.map(match => {
                return (
                    <MatchInfoBox matchDetails={match} />
                )
            })

            }

            <p>Total amount of games so far: {group.length}</p>
        </Container>
    );
};

