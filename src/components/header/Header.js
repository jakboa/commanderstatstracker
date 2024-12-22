import React from "react";
import Footer from "../Footer";
import '../Root.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Header() {

    return (
        <Row className="header">
            <Col>
                <h1 className="d-inline-flex">C</h1>
                <p className="d-inline-flex pe-2">ommander </p>
                <h1 className="d-inline-flex">S</h1>
                <p className="d-inline-flex pe-2">tats  </p>
                <h1 className="d-inline-flex">T</h1>
                <p className="d-inline-flex">racker</p>
            </Col>
            <Col className="d-flex justify-content-center">
                <Footer />
            </Col>
        </Row>
    )
};