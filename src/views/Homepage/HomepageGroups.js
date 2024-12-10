import React from "react";
import './homepage.css';

import HomepageGroupSingle from "./HomepageGroupSingle";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HomepageGroups( { commanderGroups } ) {

    return (
            <Row className=" homepage_groups">
                <p>Here I put groups!</p>
                {commanderGroups.map(group => {
                    return (
                        <Col>
                            <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                        </Col>
                    );
                })}
            </Row>
        
    )
};








