import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function HomepageCommandersSingle( { name } ) {

    const navigate = useNavigate();

    const handleCommanderClick = () => {
        navigate(`commanders/${name}`)
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>12 Games 3 wins</Card.Text>
                <Button onClick={handleCommanderClick}>Check Commander</Button>
            </Card.Body>
        </Card>



    );
};

// <Link to={`/commanders/${name}`} className="text-break">{name}</Link>