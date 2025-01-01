import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function CommanderCard( { commander } ) {

    return (
        <Card style={{width:"15rem"}}>
            <Card.Body>
                <Card.Title>{commander[0]}</Card.Title>
                <Card.Text>Victories:{commander[1].first} <br />
                Times played:{commander[1].games}</Card.Text>
                <Button>Check Stats</Button>
            </Card.Body>
        </Card>
    )
}







