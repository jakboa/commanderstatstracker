import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function HomepagePlayersSingle( { name, results } ) {

    const navigate = useNavigate();

    const handlePlayerClick = () => {
        navigate(`playerstats/${name}`)
    };

    return (
        <Card className="mb-2">
            <Card.Header className="fs-3 fw-bold">{name}</Card.Header>
            <Card.Body className="fs-5 fw-medium">
                <Card.Text className="mb-0">{results.first} Wins</Card.Text>
                <Card.Text>{results.games} Games</Card.Text>
                <Button variant="info" onClick={ handlePlayerClick }>Check Player</Button>
            </Card.Body>
        </Card>
    );
};









