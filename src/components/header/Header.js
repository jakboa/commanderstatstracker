import React from "react";
import Navigation from "../Navigation";
import '../Root.css';
import YearSelector from "../yearSelector/YearSelector";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header( { yearChoice, matches, handleFilterMatches }) {

    return (
        <Row className="header position-fixed w-100 z-1">
            <Col md={3} className="border">
                <h1 className="d-inline-flex">C</h1>
                <p className="d-inline-flex pe-2">ommander </p>
                <h1 className="d-inline-flex">S</h1>
                <p className="d-inline-flex pe-2">tats  </p>
                <h1 className="d-inline-flex">T</h1>
                <p className="d-inline-flex">racker</p>
            </Col>
            <Col md={7} className="d-flex align-items-end">
                <YearSelector yearChoice={ yearChoice } matches={ matches } handleFilterMatches={handleFilterMatches} />
            </Col>
            <Col md={2} className="d-flex justify-content-end">
                <Navigation />
            </Col>
        </Row>
    )
};