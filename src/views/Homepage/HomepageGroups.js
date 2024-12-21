import React from "react";
import './homepage.css';
import HomepageGroupSingle from "./HomepageGroupSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageGroups( { commanderGroups, handleGroupSearch, searchGroup, searchTextGroups } ) {

    console.log(commanderGroups)
    console.log(searchGroup)

    return (
        <>
            <Row className="pb-3 text-center">
                <Col md={12}>
                    <h1>Information about Groups!</h1> </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <Form.Label>Search for Group:</Form.Label>
                    <Form.Control onChange={ handleGroupSearch }></Form.Control>
                </Col>
            </Row>
            <Row className="pb-3">
                {
                    !searchTextGroups ? commanderGroups.map(group => {
                        return (
                            <Col className="border">
                                <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                            </Col>
                        )})
                    :
                    searchGroup.map(group => {
                        return (
                            <Col className="border">
                                <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                            </Col>
                    )})
                }
            </Row>
        </>
    )
};








