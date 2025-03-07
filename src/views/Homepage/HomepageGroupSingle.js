import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
//import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function HomepageSingleGroup( {groupName, groupPlayers} ) {

    const [mouseEnter, setMouseEnter] = useState(null);
    const [mouseEnterPlayer, setMouseEnterPlayer] = useState(null);

    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/groupstats/${groupName}`);
    };

    console.log(groupPlayers);
    //<Card.Header className="fs-5 fw-bold rounded-0">{groupName}</Card.Header>

    return (
        <Card className={`rounded-0 shadow cardCSS ${mouseEnter === groupName ? "bg-light fw-bold" : "" }`} style={{ width: '18rem' }} onClick={handleGroupClick} onMouseEnter={()=> setMouseEnter(groupName)} onMouseLeave={()=> setMouseEnter(null)}>
            <Card.Header className="fs-3 py-0 mt-0 mb-2">{groupName}</Card.Header>
            <Card.Body className="d-flex flex-column">
                <Row className="border rounded border-5 flex-fill">
                {groupPlayers[0].map((player,index) => {
                    return( 
                        <Col md={6} key={index} className=  {`border rounded bg-success d-flex justify-content-center align-items-center ${mouseEnterPlayer === index ? "bg-light fw-bold" : "" }`}
                            onMouseEnter={()=> setMouseEnterPlayer(index)} onMouseLeave={()=> setMouseEnterPlayer(null)}>
                            <Card.Text className="">{player}</Card.Text>
                        </Col>
                    )
                })}
                </Row>
            </Card.Body>
            <Card.Footer>XX Matches</Card.Footer>
        </Card>

    );
};