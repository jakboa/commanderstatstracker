import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function HomepageCommandersSingle( { name, results } ) {

    const navigate = useNavigate();

    const handleCommanderClick = () => {
        navigate(`commanders/${name}`)
    };


    return (
        <Card className="mb-2" style={{ width:"15rem" }}>
            <Card.Header className="d-flex justify-content-center align-items-center fs-5 fw-bold h-50">{name}</Card.Header>
            <Card.Body className="d-flex fs-5 fw-medium flex-column justify-content-end">
                <Card.Text className="mb-1">{results.first} Wins</Card.Text>
                <Card.Text>{results.games} Games </Card.Text>
                <Button className="fw-bold" variant="info" onClick={handleCommanderClick}>Check Commander</Button>
            </Card.Body>
        </Card>



    );
};

// <Link to={`/commanders/${name}`} className="text-break">{name}</Link>