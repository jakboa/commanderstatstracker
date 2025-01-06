import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function CommanderCard( { commander, commanderData } ) {

    const navigate = useNavigate();

    const commanderClick = (e) => {
        navigate(`/commanders/${e.target.value}`)
    }

    // Due to some few cards can have their commander on the backside i need to check this.
    let cardImage = "";
    // Check if there are any mistakes.
    if (!commanderData.data[commander[1].id]) {
        cardImage = "https://cards.scryfall.io/art_crop/front/0/3/036ef8c9-72ac-46ce-af07-83b79d736538.jpg?1562730661"
    } else if ( "image_uris" in commanderData.data[commander[1].id]) {
        cardImage = commanderData.data[commander[1].id].image_uris.art_crop;
    } else if ("card_faces" in commanderData.data[commander[1].id]) {
        commanderData.data[commander[1].id].card_faces.forEach(face => {
            if (face.name === commander[0]){
                cardImage = face.image_uris.art_crop;
            }
        })
    // If a picture cannot be found, add a placeholder picture instead.
    } else cardImage = "https://cards.scryfall.io/art_crop/front/0/3/036ef8c9-72ac-46ce-af07-83b79d736538.jpg?1562730661"
    //<Card.Img variant="top" src={commanderData.data[commander[1].id].image_uris.art_crop} />

    //console.log(commanderData.data[commander[1].id])



    return (
        <Card style={{width:"15rem"}}>
            <Card.Img variant="top" src={cardImage} />
            <Card.Body>
                <Card.Title>{commander[0]}</Card.Title>
                <Card.Text>Victories:{commander[1].first} <br />
                Times played:{commander[1].games}</Card.Text>
                <Button onClick={ commanderClick } value={commander[0]}>Check Stats</Button>
            </Card.Body>
        </Card>
    )
}







