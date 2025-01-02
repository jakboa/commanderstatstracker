import React from "react";

import "./CommanderStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function SingleCommanderInfoWindow( { cardData } ) {

    return (
        <Row className=" border border-white border-3 rounded my-3 ms-2 bg-light"> 
            <Col className="d-flex flex-column ">
                { Object.keys(cardData).length === 0 ? 
                    (
                        <p>...loading</p>
                    ) : 
                    (
                        <Image src={ cardData.image_uris.normal } alt="Commander Card" fluid />
                    )
                }
                <p>Hello!</p>
                <p>TEST More thext to thes this out</p>
                <p>INSERT:</p>
                <p>1. Players that play this commander. Order this by amount of times.</p>


            </Col>
        </Row>    
    )
}