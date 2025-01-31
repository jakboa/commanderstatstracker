import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchHandler from "../../components/SearchHandler";
import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import CommanderCardContainer from "../../components/commanderCard/CommanderCardContainer";
import PlayerInfoBox from "./PlayerInfoBox";
import ColorBarchart from "./playerCharts/ColorBarchart";
import Header from "../../components/header/Header";

import "./PlayerStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from 'react-bootstrap/Accordion';


export default function PlayerStats() {

    // useStates
    const [buttonsActive, setButtonsActive] = useState([false,false,false,false,false]);
    const year  = SearchHandler.getYearButtons(buttonsActive);
    const [loading, setLoading] = useState(true);
    const [fullCommanderData, setFullCommanderData] = useState([]);

    // Derived Values
    const { playerName } = useParams(); 

    const playerMatches = SearchHandler.getSinglePlayerStats(playerName); 
    const filteredMatches = SearchHandler.getEntityMatchesForYear(playerMatches,year);
    const matchResultsForPlayer = SearchHandler.getEntityResults(playerName,playerMatches);
    const databaseCommanderInfo = SearchHandler.getCommanderCardsByPlayer(filteredMatches,playerName);
    const filteredCommanderCards = fullCommanderData.filter(commander => Object.keys(commander.matchHistory).some(value => 
        year.includes(value)
    ));
    const totalGamesFiltered = filteredMatches.length; 

    // Functions
    useEffect(()=> {
        const getCommanderInfo = async () => {
            const SrcyfallCommanderData = await ScryFallAPIConnector.getGroupCommanderData(databaseCommanderInfo);
            const combinedDatabaseAndApiData = SearchHandler.getCommanderFactsForPlayer(SrcyfallCommanderData, databaseCommanderInfo);
            setLoading(false);
            setFullCommanderData(combinedDatabaseAndApiData);
        };

        getCommanderInfo();
    // I am disabling a warning here because i want it to read the info once and
    // I do not need it to update as that info is then stored somewhere else.
    // eslint-disable-next-line
    },[]);

    const toggleYearsUpdate = (buttonNr) => {
        setButtonsActive(prev => {
            const updatedButtons = [...prev];
            updatedButtons[buttonNr] = !prev[buttonNr];
            return updatedButtons
        });
    };

    const handleAllYears = () => {
        setButtonsActive([false,false,false,false,false]);
    }



    return (
        <Row className="playerstats">
            <Col md={12} style={{ height:"3.8rem" }}>
                <Header yearChoice={ true } matches={ playerMatches } 
                        buttonsActive={ buttonsActive }
                        toggleYearsUpdate={ toggleYearsUpdate }
                        handleAllYears={ handleAllYears } />
            </Col>


            {/* BANNER */}
            <Col md={12} className="p-0 bg-info-subtle" style={{height:"7rem"}}>
                <Row className="h-100 w-100">
                    <Col md={6} className="d-flex align-items-center">
                        <h1 className="">Stats for {playerName}</h1>
                    </Col>
                </Row>
            </Col>

            {/* INFO */}
            <Col md={3} className="d-flex justify-content-center pe-0">
                <div className="p-2 border border-white border-3 rounded-4 bg-light text-center my-2 w-100">
                    <h2 className="rounded-3 pb-1" style={{background:"#5C6ED1"}}>Fun Facts:</h2>
                    <PlayerInfoBox commanderData={ filteredCommanderCards } loading={ loading } years={ year } matchResultsForPlayer={ matchResultsForPlayer }/>
                </div>
            </Col>

            {/* STATS & GRAPH */}
            <Col className="text-center">
                <Row className=" my-2">

                    {/* STATS */}
                    <Col className="pe-0">
                        <div className="d-flex flex-column h-100">
                            <p className="border border-white rounded-4 rounded bg-light">Total amount of games so far: {playerMatches.length}</p>
                            <EntityScore matchResultsForEntity={ matchResultsForPlayer } totalGames={ totalGamesFiltered } years={ year } />
                        </div>
                    </Col>

                    {/* DOUGHNUT */}
                    <Col md={7} style={{height:"22rem"}}>
                        <DoughnutChart results={ matchResultsForPlayer } years={ year } /> 
                    </Col>
                </Row>
                
                {/* LINECHART */}
                <Row className=" my-2" style={{height:"13rem"}}>
                    <Col>
                        <LineChart entityName={ playerName } entityMatches={ filteredMatches } />
                    </Col>
                </Row>
            </Col>
            <Col md={12} className="mb-3">
                <Accordion defaultActiveKey="Accordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Facts about your decks: (UNDER CONSTRUCTION)</Accordion.Header>
                        <Accordion.Body className="py-0">

                            <Row className="border border-black">

                                <Col md={6} className="border py-2 ps-0 pe-1">
                                    <div className="border rounded-2">
                                        <p>Words</p>
                                    </div>
                                </Col>

                                <Col md={6} className="border py-2 ps-1 pe-0">
                                    <div className="border rounded-2">
                                        <p>Words</p>
                                    </div>
                                </Col>

                                <Col md={12} className="border px-0">
                                    <div className="border rounded-2 ">
                                        <ColorBarchart filteredCommanderCards={ filteredCommanderCards } loading={ loading } />
                                    </div>
                                </Col>

                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Other facts about your deck: (UNDER CONSTRUCTION)</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>

            {/* COMMANDERS */}
            <Col md={12} className="border-top border-5 border-black py-3 bg-light ">
                <div className="d-flex justify-content-center align-items-center mt-2">
                    <h1 className="border border-bottom-0 border-black border-4 rounded-top mb-0 px-2 fw-semibold text-uppercase bg-info-subtle">{playerName}`s commanders</h1>
                </div>
                <div className="bg-info-subtle border border-black border-4 rounded-4 p-3">
                    <CommanderCardContainer commanderStatsInfo={ filteredCommanderCards } years={ year } loading= { loading } />
                </div>
            </Col>

            {/* MATCHES */}
            <Col md={12} className="border-top border-5 border-black">
                <h1 className="text-center m-3">Match results for {playerName}</h1>
                <MatchInfoBox matchDetails={ filteredMatches } focus={ playerName } />
            </Col>
        </Row>
    )
}