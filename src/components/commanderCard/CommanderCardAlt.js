import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CommanderCardStyling.css";

import Card from "react-bootstrap/Card";

export default function CommanderCardAlt( { commander, years } ) {

    const [hovered,setHovered] = useState(false);
    const navigate = useNavigate();

    const commanderClick = (commander) => {
        navigate(`/commanders/${commander}`)
    }


    const summedStats = years.reduce((accumulator, year) =>{
        const yearData = commander.matchHistory[year] || {};
        Object.keys(yearData).slice(0,5).forEach(placement => {
          accumulator[placement] +=  yearData[placement];
        })
        return accumulator;
      },{1:0,2:0,3:0,4:0,games:0});

    console.log(hovered)

    return (
        <Card className="bg-dark text-white shadow" onClick={ () => commanderClick(commander.name)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Card.Img  src={commander.image} />
            <div className={`rounded ${hovered ? "commanderCardActive" : "commanderCardInactive"}`}
                 />
            <Card.ImgOverlay className="pt-1">
                <Card.Text className="h-25 mb-3 fw-bold fs-2">{commander.name}</Card.Text>
                <Card.Text className="pt-3 fs-5">Victories: {summedStats[1]} <br/>
                Times played: {summedStats.games}</Card.Text>
                <Card.Text className="fst-italic">Price: {commander.price === "0.00" ? "Unknown" : commander.price+"€"}</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}







