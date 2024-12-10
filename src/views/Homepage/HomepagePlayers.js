import React from "react";
import HomepagePlayersSingle from "./HomepagePlayersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HomepagePlayers( { players } ) {

    return (
        <Row className="homepage_players">
            <p>Here I put Players!</p>
            { players.map(player => {
                return (
                    <Col>
                        <HomepagePlayersSingle name={player} />
                        
                    </Col>
                )
            })
            }
        </Row>
    );

};