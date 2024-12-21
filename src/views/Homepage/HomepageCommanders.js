import React from "react";
import HomepageCommanderSingle from "./HomepageCommandersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageCommanders( { commanders, searchCommanders, handleCommanderSearch, searchTextCommanders } ) {

    return (
        <>
            <Row className="pb-3 text-center">
                <Col md={12}>
                    <h1>Find Commander.</h1> </Col>
                <Col md={12} className="d-flex justify-content-center mb-3">
                    <Form>
                        <Form.Label>Search For Commander:</Form.Label>
                        <Form.Control onChange={ handleCommanderSearch }></Form.Control>
                    </Form>
                </Col>
            </Row>

            <Row className="d-flex flex-nowrap overflow-x-scroll" >
                    {
                        !searchTextCommanders ? commanders.map(commander => {
                            return (
                                <Col md={2} className="homepage_commanders_single">
                                    <HomepageCommanderSingle name={ commander } />
                                </Col>
                            )})
                         :
                         searchCommanders.map(commander => {
                            return (
                                <Col md={2} className="homepage_commanders_single">
                                    <HomepageCommanderSingle name={ commander } />
                                </Col>
                            )})   
                    }
            </Row>
        </>
    );

};