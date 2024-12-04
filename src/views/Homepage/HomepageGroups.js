import React from "react";
import './homepage.css';

import HomepageGroupSingle from "./HomepageGroupSingle";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HomepageGroups( { commanderGroups } ) {

    return (
        <div className="homepage_groups">
            <p>Here I put groups!</p>
            <Row className="d-flex align-items-center">
            {commanderGroups.map(group => {
                return (
                    <Col>
                        <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                    </Col>
                );
            })}
            </Row>
        </div>
    )
};








