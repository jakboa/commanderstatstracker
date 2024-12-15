import React from "react";
import './homepage.css';
import HomepageGroupSingle from "./HomepageGroupSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageGroups( { commanderGroups } ) {

    return (
        <>
            <Row className="pb-3 text-center">
                <Col md={12}>
                <h1>Information about Groups!</h1> </Col>
                <Col md={12}>
                    <Form.Label>Search for Group:</Form.Label>
                    <Form.Control></Form.Control>
                </Col>
            </Row>
            <Row className="pb-3">
                {commanderGroups.map(group => {
                    return (
                        <Col>
                            <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                        </Col>
                    );
                })}
            </Row>
        </>
    )
};








