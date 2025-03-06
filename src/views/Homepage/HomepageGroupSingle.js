import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function HomepageSingleGroup( {groupName, groupPlayers} ) {

    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/groupstats/${groupName}`);
    };

    console.log(groupPlayers);
    //<Card.Header className="fs-5 fw-bold rounded-0">{groupName}</Card.Header>

    return (
        <Card className="rounded-0 shadow cardCSS" style={{ width: '18rem' }} onClick={handleGroupClick}>
            <Card.Body className="">
                <Card.Text className="fw-bold fs-3 py-0 my-0">{groupName}</Card.Text>
                <Card.Text className="fw-bold py-0 my-0">Players:</Card.Text>
                <Row>
                {groupPlayers[0].map((player,index) => {
                    return( 
                        <Col md={6} key={index} className="border rounded border-5 bg-success fw-bold">
                            <Card.Text className="py-0 my-0">{player}</Card.Text>
                        </Col>
                    )
                })}
                </Row>
                <Button className="mt-3 fw-bold" variant="info" onClick={handleGroupClick}>Click for Group Stats!</Button>
            </Card.Body>
        </Card>

    );
};