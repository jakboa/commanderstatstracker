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
                <Col md={12}> 
                    <h1>Find Stats about player:</h1> 
                </Col>
                <Col md={12} className="d-flex justify-content-center mb-3">
                    <Form>
                        <Form.Label>Search for player:</Form.Label>
                        <Form.Control value={ searchTextPlayers } onChange={ handlePlayerSearch }></Form.Control>
                    </Form>
                </Col>
            </Row>

            <Row className="flex-nowrap overflow-x-scroll text-center">
                {
                    displayPlayers.length > 0 ?
                    displayPlayers.map(player => {
                        return (
                            <Col md={3} sm={4} className="p-5">
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