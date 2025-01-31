import React from "react";

import CommanderCard from "./CommanderCard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CommanderCardContainer( { commanderStatsInfo, years, loading  } ) {

    console.log(commanderStatsInfo);

    return (
        <Row>

            { loading ? (
                <p>...loading</p>
            ) : (
                commanderStatsInfo.map( (commander,index) => {
                    return (
                        <Col key={index} md={2} className=" d-flex p-2">
                            <CommanderCard commander={ commander } years={ years } />
                        </Col>
                )
            }))
        }
        </Row>
    )

}



