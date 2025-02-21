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
        <Card bg="light" className="border border-3  border-primary border-black"  style={{ width: '18rem' }}>
            <Card.Header className="fs-5 fw-bold">{groupName}</Card.Header>
            <Card.Body>
                {groupPlayers[0].map((player,index) => {
                    return( 
                        <Card.Text key={index} className="fw-bold py-0 my-0">-- {player} --</Card.Text>
                    )
                })}
                <Button className="mt-3 fw-bold" variant="info" onClick={handleGroupClick}>Click for Group Stats!</Button>
            </Card.Body>
        </Card>

    );
};