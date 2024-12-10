import React from "react";
import HomepageCommanderSingle from "./HomepageCommandersSingle";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function HomepageCommanders( { commanders } ) {
    

    return (
        <Row className="homepage_commanders">
            <p>Here I put Commanders!</p>
            { commanders.map(commander => {
                return (
                    <Col>
                        <HomepageCommanderSingle name={ commander } />
                    </Col>
                )
            })
            }
        </Row>
    );

};