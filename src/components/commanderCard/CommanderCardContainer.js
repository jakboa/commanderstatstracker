import React from "react";

import CommanderCard from "./CommanderCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CommanderCardContainer( { commanderCardInfo, commanderData, loading  } ) {

    return (
        <Row>

            { loading ? (
                <p>...loading</p>
            ) : (
                commanderCardInfo.map( commander => {
                    return (
                        <Col>
                            <CommanderCard commander={ commander } commanderData= { commanderData } />
                        </Col>
                )
            }))
        }
        </Row>
    )

}



