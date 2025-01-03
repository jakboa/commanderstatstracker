import React, { useState, useEffect } from "react";
import './homepage.css';
import HomepageGroupSingle from "./HomepageGroupSingle";

import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

export default function HomepageGroups( { commanderGroups, handleGroupSearch, searchGroup, searchTextGroups } ) {

    const displayGroup = !searchTextGroups ? commanderGroups : searchGroup;
    const [randoCard,setRandoCard] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getRandoCard = async() => {
            const data = await ScryFallAPIConnector.fetchRandomCardData() 
            setRandoCard(data);
            setLoading(false);
        }

        getRandoCard();
    },
    [])


    return (
        <>
            <Row>
                <Col>
                
                    <p>API TESTING ZONE:</p>
                    { loading ? 
                        (<p>...loading</p>)
                        :
                        (
                            <>        
                            <p>{randoCard.name}</p>
                            <p>{randoCard.color_identity}</p>
                            <p>{randoCard.full_art}</p>
                            </>
                        )
                    }
                    <p>API TESTING ZONE:</p>
                </Col>
            </Row>
            
            
            <Row className="pb-3 text-center">
                <Col md={12}> <h1>Information about Groups!</h1> </Col>
                <Col md={12} className="d-flex justify-content-center">
                    <Form>
                        <Form.Label>Search for Group:</Form.Label>
                        <Form.Control value={ searchTextGroups } onChange={ handleGroupSearch }></Form.Control>
                    </Form>
                </Col>
            </Row>
            <Row className="pb-3 text-center">
                {
                    displayGroup.length > 0 ?
                    displayGroup.map(group => {
                        return (
                            <Col className="border">
                                <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                            </Col>
                    )})
                    :
                    <p>No Commanders found with that name!</p>
                }
            </Row>
        </>
    )
};








