import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchHandler from "../../components/SearchHandler";
import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import SingleCommanderInfoWindow from "./SingleCommanderInfoWindow";
import YearSelector from "../../components/YearSelector";

import "./CommanderStats.css"

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";


export default function SingleCommanderStats() {

    // useStates 
    const [year, setYear] = useState("allMatches");
    const [player, setPlayer] = useState("allPlayers");
    const [cardData, setCardData] = useState({});
    const [cardImages, setCardImages] = useState({});
    const [loading, setLoading] = useState(true);

    // Derived Values
    const { commanderName } = useParams();

    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    const matchResultsForCommander= SearchHandler.getEntityResults(commanderName,commanderInfo);
    const filteredMatches = SearchHandler.getEntityMatchesForYearAndPlayer(commanderInfo,year,player,commanderName);
    const totalGames = filteredMatches.length; 




    // Functions
    const handleFilterMatches = (e) =>{
        setYear(e);
    };

    const handleFilterMatchesPlayer  = (e) =>{
        setPlayer(e.target.value);
    };

    useEffect(()=> {
        const fetchCommanderData = async () => {
            const data = await ScryFallAPIConnector.getSingleCommanderData(commanderName);
            setCardData(data);
            setLoading(false);
            setCardImages(SearchHandler.getCardImage(data, commanderName))

        };
        fetchCommanderData();
    }
    // eslint-disable-next-line
    ,[commanderName])



    return (
        <Row className="singleCommanderPage">
            {/* Name and Banner */}
            <Col md={12} className={`${loading ? "bg-info-subtle": "" } `} 
                style={{
                    backgroundImage: loading ? "": `url(${cardImages.art})`, 
                    height:"5rem"  
                    }}  >
                <Row className="h-100">
                    <Col>
                        <h1>{commanderName}</h1>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-end">
                        <div>
                        <YearSelector matches={ commanderInfo } handleFilterMatches={handleFilterMatches} />
                        </div>
                    </Col>
                </Row>
            </Col>

            {/* Picture of Commander and InfoBox */}
            <Col md={3} className="d-flex justify-content-center text-center ">
                <SingleCommanderInfoWindow cardImages={ cardImages } cardData={ cardData } matchResultsForCommander={ matchResultsForCommander } />
            </Col>

            {/* Graphs and Info */}
            <Col md={9}>
                <Row className="m-3">
                    <Col md={5} className="d-flex flex-column text-center">
                        <p className="bg-light border rounded">Played a total of { totalGames } times!</p>
                        <EntityScore matchResultsForEntity={ matchResultsForCommander } totalGames={ totalGames } year={ year } />
                    </Col>
                    <Col md={7} style={{height:"20rem"}} >
                        <DoughnutChart results={ matchResultsForCommander } year={ year }/>
                    </Col>
                </Row>

                {/* Line Chart */}
                <Row className="m-3" >
                    <Col className="d-flex align-items-stretch justify-content-center" style={{height:"13rem"}}  >
                        <LineChart entityName={ commanderName } entityMatches={ commanderInfo } />
                    </Col>
                </Row>
                <Row className="m-3" >
                    <Col>
                        <Button onClick={ handleFilterMatchesPlayer } value={ "allPlayers" } >All Players</Button>
                    </Col>
                    { matchResultsForCommander.players.map((player, index) => {
                        return (
                            <Col key={index}>
                                <Button onClick={ handleFilterMatchesPlayer } value={ player } >{player}</Button>
                            </Col>
                    )})

                    }
                </Row>
            </Col>

            {/* Games Played and Results */}
            <Col md={12} className="border border-5 border-black round-end">
                <MatchInfoBox matchDetails={ filteredMatches } focus={ commanderName } />
            </Col>
            
        </Row>

    )
}




