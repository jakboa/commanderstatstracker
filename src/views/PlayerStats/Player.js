import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchHandler from "../../components/SearchHandler";
import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import YearSelector from "../../components/YearSelector";
import CommanderCardContainer from "../../components/commanderCard/CommanderCardContainer";
import PlayerInfoBox from "./PlayerInfoBox";

import "./PlayerStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function PlayerStats() {

    // useStates
    const [year,setYear] = useState("allMatches");
    const [commanderData, setCommanderData] = useState({});
    const [loading, setLoading] = useState(true);
    const [commanderStatsInfo, setCommanderStatsInfo] = useState([]);

    // Derived Values
    const { playerName } = useParams(); 

    const playerInfo = SearchHandler.getSinglePlayerStats(playerName); 
    const filteredMatches = SearchHandler.getEntityMatchesForYear(playerInfo,year);
    const matchResultsForPlayer = SearchHandler.getEntityResults(playerName,filteredMatches);
    const commanderCardInfo = SearchHandler.getCommanderCardsByPlayer(filteredMatches,playerName);
   
    const totalGames = filteredMatches.length; 

    // Functions
    const handleFilterMatches = (e) =>{
        setYear(e);
    };

    useEffect(()=> {
        const getCommanderInfo = async () => {
            const data = await ScryFallAPIConnector.getGroupCommanderData(commanderCardInfo);
            const commanderFacts = SearchHandler.getCommanderFactsForPlayer(data);
            setCommanderData(data);
            setLoading(false);
            setCommanderStatsInfo(commanderFacts);
        };

        getCommanderInfo();
    // I am disabling a warning here because i want it to read the info once and
    // I do not need it to update as that info is then stored somewhere else.
    // eslint-disable-next-line
    },[]);

    console.log(commanderData);
    console.log(commanderStatsInfo);


    return (
        <Row className="playerstats">

            {/* BANNER */}
            <Col md={12} className="p-0 bg-info-subtle" style={{height:"7rem"}}>
                <Row className="h-100 w-100">
                    <Col md={6} className="d-flex align-items-center">
                        <h1 className="">Stats for {playerName}</h1>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end align-items-end">
                        <div >
                            <YearSelector  matches={ playerInfo } handleFilterMatches={handleFilterMatches} />
                        </div>
                    </Col>
                </Row>
            </Col>

            {/* INFO */}
            <Col md={3} className="d-flex justify-content-center pe-0">
                <div className="p-2 border border-white border-3 rounded-4 bg-light text-center my-2 w-100">
                    <h3>Here there will be facts:</h3>
                    <PlayerInfoBox commanderStatsInfo={ commanderStatsInfo } loading={ loading } />
                </div>
            </Col>

            {/* STATS & GRAPH */}
            <Col className="text-center">
                <Row className=" my-2">

                    {/* STATS */}
                    <Col className="pe-0">
                        <div className="d-flex flex-column h-100">
                            <p className="border border-white rounded-4 rounded bg-light">Total amount of games so far: {totalGames}</p>
                            <EntityScore results={ matchResultsForPlayer } totalGames={ totalGames } />
                        </div>
                    </Col>

                    {/* DOUGHNUT */}
                    <Col md={7} style={{height:"22rem"}}>
                        <DoughnutChart results={ matchResultsForPlayer } /> 
                    </Col>
                </Row>
                
                {/* LINECHART */}
                <Row className=" my-2" style={{height:"13rem"}}>
                    <Col>
                        <LineChart entityName={ playerName } entityMatches={ filteredMatches } />
                    </Col>
                </Row>
            </Col>

            {/* COMMANDERS */}
            <Col md={12}>
                <CommanderCardContainer commanderCardInfo={ commanderCardInfo } commanderData={ commanderData } loading= { loading } />
            </Col>

            {/* MATCHES */}
            <Col md={12} className="border-top border-black">
                <h1 className="text-center m-3">This is the matches for {playerName}</h1>
                <MatchInfoBox matchDetails={ filteredMatches } focus={ playerName } />
            </Col>
        </Row>
    )
}