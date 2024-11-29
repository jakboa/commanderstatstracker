import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfo from "../../components/MatchInfo";



export default function GroupStats() {

    const { groupname } = useParams();

    const group = SearchHandler.getOneGroup(groupname);

    return (
        <>
            <p>Her er groupStats for {groupname}!</p>
            { group.map(match => {
                return (
                    <MatchInfo matchDetails={match} />
                )
            })

            }

            <p>Total amount of games so far: {group.length}</p>
        </>
    );
};

