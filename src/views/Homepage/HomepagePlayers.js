import React from "react";
import HomepagePlayersSingle from "./HomepagePlayersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HomepagePlayers( { players } ) {

    return (
        <Row className="d-flex text-center homepage_players">
            <p>Here I put Players!</p>
            { players.map(player => {
                return (
                    <Col className=" m-3 homepage_commanders_single">
                        <HomepagePlayersSingle name={player} />
                        
                    </Col>
                )
            })
            }
        </Row>
    );

};