import React from "react";

import "./CommanderStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SingleCommanderInfoWindow() {


    return (
        <Row className=" border border-white border-3 rounded my-3 ms-2 bg-light"> 
            <Col className="d-flex flex-column ">
                <p>Hello!</p>
                <p>TEST More thext to thes this out</p>
                <p>INSERT:</p>
                <p>1. Players that play this commander. Order this by amount of times.</p>

            </Col>
        </Row>    
    )
}