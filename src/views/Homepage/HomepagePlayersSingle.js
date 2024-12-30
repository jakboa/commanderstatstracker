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
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{results.first} Wins {results.games} Games</Card.Text>
                <Button onClick={ handlePlayerClick }>Check Player</Button>
            </Card.Body>
        </Card>
    );
};









