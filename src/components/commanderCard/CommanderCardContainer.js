import React from "react";

import CommanderCard from "./CommanderCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CommanderCardContainer( { commanderCardInfo } ) {

    return (
        <Row>

            {
                commanderCardInfo.map( commander => {
                    return (
                        <Col>
                            <CommanderCard commander={ commander } />
                        </Col>
                )
            })}
        </Row>
    )

}



