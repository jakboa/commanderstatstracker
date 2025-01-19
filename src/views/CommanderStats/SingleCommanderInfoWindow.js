import React from "react";
import { useNavigate } from "react-router-dom";

import "./CommanderStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

export default function SingleCommanderInfoWindow( {cardData, cardImages, loading, error, matchResultsForCommander } ) {

    const navigate = useNavigate();
    
    const goToGroup = (e) => {
        navigate(`/groupstats/${e.target.value}`);
    };
    const goToPlayer = (e) => {
        navigate(`/playerstats/${e.target.value}`);
    };

    console.log(cardImages)

    return (
        <Row className=" border border-white border-3 rounded my-3 ms-2 bg-light"> 
            <Col className="d-flex flex-column ">
                { loading ? 
                    (
                        <p>...loading</p>
                    ) : error.status ? (
                        <>
                            <Image src={ cardImages.cardImage } alt="Commander Card" fluid className="rounded mt-2" />
                            <p>{error.message}</p>
                        </>
                    ) :
                    (   <>
                        <Image src={ cardImages.cardImage } alt="Commander Card" fluid className="rounded mt-2" />
                        <p>{cardData.name}</p>
                        </>
                    )
                }
                <h4>Played By:</h4>
                {
                    matchResultsForCommander.players.map((player,index) => {
                        return (
                            <Button className="mb-3" key={ index } onClick={ goToPlayer } value={ player }>{player}</Button>
                        )
                    })
                }
                <h4>Played in these Group(s):</h4>
                {
                    matchResultsForCommander.groups.map((group,index) => {
                        return (
                            <Button  className="mb-3" key={ index } onClick={ goToGroup } value={ group }>{group}</Button>
                        )
                    })
                }
            </Col>
        </Row>    
    )
}