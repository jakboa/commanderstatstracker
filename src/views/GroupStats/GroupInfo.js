import React from "react";
import SearchHandler from "../../components/SearchHandler";

import { Link } from "react-router-dom";

export default function GroupInfo( { group } ) {

    const groupInfo = SearchHandler.getGroupInfo(group);

    //console.log(groupInfo);

    return (
        <>
            <p>Info about the group:</p>
            <p>Player names.</p>
            
            {groupInfo.arrayPlayerNicks.map(nick => {
                return (
                    <>
                    <Link to={`/playerstats/${nick}`}>{nick}</Link>< br/>
                    </>
                )
                })
            }
            
            <p>TO ADD:</p>
            <p>INSERT: Top used commanders.</p>
            
            <p>INSERT: Top winning commanders.</p>
            <p>Fun fact 1.</p>
            <p>Fun fact 2.</p>
        </>
    );
};


