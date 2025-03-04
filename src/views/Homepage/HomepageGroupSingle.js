import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function HomepageSingleGroup( {groupName, groupPlayers} ) {

    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/groupstats/${groupName}`);
    };

    console.log(groupPlayers);

    return (
        <Card className="rounded-0 shadow" style={{ width: '18rem' }}>
            <Card.Header className="fs-5 fw-bold rounded-0">{groupName}</Card.Header>
            <Card.Body className="">
                <Card.Text className="fw-bold py-0 my-0">Players:</Card.Text>
                {groupPlayers[0].map((player,index) => {
                    return( 
                        <Card.Text key={index} className="py-0 my-0">{player}</Card.Text>
                    )
                })}
                <Button className="mt-3 fw-bold" variant="info" onClick={handleGroupClick}>Click for Group Stats!</Button>
            </Card.Body>
        </Card>

    );
};