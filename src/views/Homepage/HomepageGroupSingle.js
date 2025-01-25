import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function HomepageSingleGroup( {groupName, groupPlayers} ) {

    const navigate = useNavigate();

    const handleGroupClick = () => {
        navigate(`/groupstats/${groupName}`);
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{groupName}</Card.Title>
                {groupPlayers.map((player,index) => {
                    return( 
                        <div key={index}>
                            <Card.Text>{player}</Card.Text>
                            <Button variant="primary" onClick={handleGroupClick}>Check Group Stats!</Button>
                        </div>
                    )
                })}
            </Card.Body>
        </Card>

    );
};