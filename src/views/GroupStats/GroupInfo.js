import React from "react";
import SearchHandler from "../../components/SearchHandler";

import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";

export default function GroupInfo( { group } ) {

    const groupInfo = SearchHandler.getGroupInfo(group);

    return (
        <Col>
            <div className="d-flex flex-column bg-light border border-white rounded m-2">
                <p>Info about the group:</p>
                <p>Player names.</p>
                
                {groupInfo.arrayPlayerNicks.map(nick => {
                    return (
                        <>
                        <Link to={`/playerstats/${nick}`}>{nick}</Link>< br/>
                        </>
                    );
                })}
                
                <p>TO ADD:</p>
                <p>INSERT: Top used commanders.</p>
                
                <p>INSERT: Top winning commanders.</p>
                <p>Fun fact 1.</p>
                <p>Fun fact 2.</p>
            </div>
        </Col>
    );
};


