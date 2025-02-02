import React from "react";
import Navigation from "../Navigation";
import '../Root.css';
import YearSelector from "../yearSelector/YearSelector";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayerSelector from "../playerSelector/PlayerSelector";

export default function Header( {active, yearChoice, matches, buttonsActive, toggleYearsUpdate, handleAllYears, handleFilterMatchesPlayer, matchResultsForCommander }) {

    return (
        <Row className="header position-fixed w-100 z-1">
            <Col md={3} className="border">
                <h1 className="d-inline-flex">C</h1>
                <p className="d-inline-flex pe-2">ommander </p>
                <h1 className="d-inline-flex">S</h1>
                <p className="d-inline-flex pe-2">tats  </p>
                <h1 className="d-inline-flex">T</h1>
                <p className="d-inline-flex">racker</p>
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-center align-items-center ">
                <PlayerSelector active={ active } handleFilterMatchesPlayer={ handleFilterMatchesPlayer } matchResultsForCommander={ matchResultsForCommander }  />
                <YearSelector yearChoice={ yearChoice } matches={ matches } buttonsActive= { buttonsActive } toggleYearsUpdate={ toggleYearsUpdate }  handleAllYears= { handleAllYears } />
            </Col>
            <Col md={3} className="d-flex justify-content-end">
                <Navigation />
            </Col>
        </Row>
    )
};