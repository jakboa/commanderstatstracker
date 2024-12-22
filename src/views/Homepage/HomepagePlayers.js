import React from "react";
import HomepagePlayersSingle from "./HomepagePlayersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form"

export default function HomepagePlayers( { players, handlePlayerSearch, searchPlayers, searchTextPlayers } ) {

    // if searchbar is empty, then show every player 
    const displayPlayers = !searchTextPlayers ? players : searchPlayers;

    return (
        <>
            <Row className="pb-3 text-center">
                <Col md={12}> <h1>Find Stats about player:</h1> </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <Form>
                        <Form.Label>Search for player:</Form.Label>
                        <Form.Control onChange={ handlePlayerSearch }></Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row className="d-flex flex-nowrap overflow-x-scroll text-center">
            {
                
                displayPlayers.length > 0 ?
                displayPlayers.map(player => {
                    return (
                        <Col md={1} className=" m-3 homepagePlayerSingle">
                            <HomepagePlayersSingle name={player} />
                            
                        </Col>
                    )})
                    :
                    <p>No players found with that name!</p>                    
            }
            </Row>
        </>
    );

};