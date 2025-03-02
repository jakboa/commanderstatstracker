import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function CommanderCard( { commander, years } ) {

    const navigate = useNavigate();

    const commanderClick = (e) => {
        navigate(`/commanders/${e.target.value}`)
    }


    const summedStats = years.reduce((accumulator, year) =>{
        const yearData = commander.matchHistory[year] || {};
        Object.keys(yearData).slice(0,5).forEach(placement => {
          accumulator[placement] +=  yearData[placement];
        })
        return accumulator;
      },{1:0,2:0,3:0,4:0,games:0});

    return (
        <Card>
            <Card.Img variant="top" src={commander.image} />
            <Card.Body className="pb-1">
                <Card.Title className="h-25 mb-3">{commander.name}</Card.Title>
                <Card.Text>Victories: {summedStats[1]} <br />
                Times played: {summedStats.games}</Card.Text>
                <Button onClick={ commanderClick } value={commander.name}>Check Stats</Button>
                <Card.Text className="fst-italic text-end mb-0">Price: {commander.price}€</Card.Text>
            </Card.Body>
        </Card>
    )
}







