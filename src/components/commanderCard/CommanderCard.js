import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function CommanderCard( { commander, year } ) {

    const navigate = useNavigate();

    const commanderClick = (e) => {
        navigate(`/commanders/${e.target.value}`)
    }

    return (
        <Card >
            <Card.Img variant="top" src={commander.image} />
            <Card.Body>
                <Card.Title className="h-25 mb-3">{commander.name}</Card.Title>
                <Card.Text>Victories:{commander.matchHistory[year][1]} <br />
                Times played:{commander.matchHistory[year].games}</Card.Text>
                <Button onClick={ commanderClick } value={commander.name}>Check Stats</Button>
            </Card.Body>
        </Card>
    )
}







