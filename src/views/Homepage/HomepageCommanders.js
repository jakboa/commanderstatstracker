import React from "react";
import HomepageCommanderSingle from "./HomepageCommandersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageCommanders( { commanders, searchCommanders, handleCommanderSearch, searchTextCommanders } ) {

    console.log(searchTextCommanders);

    return (
        <>
            <Row className=" mb-3 text-center" >
                <Col md={12}>
                    <h1>Here I put Commanders!</h1> </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <Form>
                        <Form.Label>Search For Commander Here:</Form.Label>
                        <Form.Control onChange={handleCommanderSearch}></Form.Control>
                    </Form>
                </Col>
            </Row>

            <Row className="d-flex flex-nowrap overflow-x-scroll text-center" >
                    {
                        !searchTextCommanders ? commanders.map(commander => {
                            return (
                                <Col md={1} className="homepage_commanders_single">
                                    <HomepageCommanderSingle name={ commander } />
                                </Col>
                            )})
                         :
                         searchCommanders.map(commander => {
                            return (
                                <Col md={1} className="homepage_commanders_single">
                                    <HomepageCommanderSingle name={ commander } />
                                </Col>
                            )})
                        
                    }

        
            </Row>
        </>
    );

};