import React from "react";
import './homepage.css';
import HomepageGroupSingle from "./HomepageGroupSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageGroups( { commanderGroups, handleGroupSearch, searchGroup, searchTextGroups } ) {

    const displayGroup = !searchTextGroups ? commanderGroups : searchGroup;

    return (
        <>
            <Row className="pb-3 text-center">
                <Col md={12}> <h1>Information about Groups!</h1> </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <Form>
                        <Form.Label>Search for Group:</Form.Label>
                        <Form.Control value={ searchTextGroups } onChange={ handleGroupSearch }></Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row className="pb-3 text-center">
                {
                    displayGroup.length > 0 ?
                    displayGroup.map(group => {
                        return (
                            <Col className="border">
                                <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                            </Col>
                    )})
                    :
                    <p>No Commanders found with that name!</p>
                }
            </Row>
        </>
    )
};








