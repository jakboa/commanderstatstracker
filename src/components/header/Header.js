import React from "react";
import Navigation from "../Navigation";
import '../Root.css';
import YearSelector from "../YearSelector";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header( { yearChoice, matches, handleFilterMatches }) {

    return (
        <Row className="header position-fixed w-100 z-1">
            <Col>
                <h1 className="d-inline-flex">C</h1>
                <p className="d-inline-flex pe-2">ommander </p>
                <h1 className="d-inline-flex">S</h1>
                <p className="d-inline-flex pe-2">tats  </p>
                <h1 className="d-inline-flex">T</h1>
                <p className="d-inline-flex">racker</p>
            </Col>
            <Col>
                <YearSelector yearChoice={ yearChoice } matches={ matches } handleFilterMatches={handleFilterMatches} />
            </Col>
            <Col className="d-flex justify-content-end">
                <Navigation />
            </Col>
        </Row>
    )
};