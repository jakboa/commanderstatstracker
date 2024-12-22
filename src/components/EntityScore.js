import React from "react";

import "./components.css";

import Col from "react-bootstrap/Col";

export default function EntityScore( { results, totalGames } ) {

    return (
        <Col className="d-flex flex-column align-items-center bg-light-subtle border border-white border-5 rounded-5">
            <p>Match Results thus far:</p>
            { results.map((results,placement) => {
                return (
                    <p>You have gotten {placement+1}: {results} = {Math.round((results/totalGames)*100)}%</p>
                );
            })}
            
        </Col>
    );
};





