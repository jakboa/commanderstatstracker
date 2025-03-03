import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchHandler from "../../components/SearchHandler";
import ScryFallAPIConnector from "../../utils/api/ScryFallAPIConnector";

import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import EntityScore from "../../components/EntityScore";
import LineChart from "../../components/charts/LineChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import SingleCommanderInfoWindow from "./SingleCommanderInfoWindow";
import Header from "../../components/header/Header";

import "./CommanderStats.css"

import Col  from "react-bootstrap/Col";
import Row  from "react-bootstrap/Row";

export default function SingleCommanderStats() {

    // useStates
    const [filters,setFilters] = useState({groupFilter: ["allGroups"], playerFilter: ["allPlayers"], yearFilter:["allYears"]});
    const [buttonsActive, setButtonsActive] = useState([false,false,false,false,false]);
    const [toggleYear, setToggleYear] = useState(true);
    const year  = SearchHandler.getYearButtons(buttonsActive);
    
    const [player, setPlayer] = useState("allPlayers");
    const [cardData, setCardData] = useState({});
    const [cardImages, setCardImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({status: false});

    // Derived Values
    const { commanderName } = useParams();

    // All the games with that commander, static
    const commanderInfo = SearchHandler.getSingleCommanderStats(commanderName);
    
    // A filtered list based on a string from player usestate:
    const filteredMatchesByPlayer = SearchHandler.getFilteredPlayer(commanderInfo,player);
    console.log(filteredMatchesByPlayer);

    // A filtered list of games.
    const filteredMatches = SearchHandler.getEntityMatchesForYearAndPlayer(commanderInfo,year,player,commanderName);
    
    // Stats for years, which players and so on for that commander.
    const matchResultsForCommander= SearchHandler.getEntityResults(commanderName,commanderInfo);
    
    // Filtered stats for that commander
    const matchResultsForCommmanderFILTERED= SearchHandler.getEntityResults(commanderName,filteredMatches);

    const totalGames = filteredMatches.length;

    // Currently not in use, will be used once filter logic is done.
    const allFilteredGames = SearchHandler.setFilter(commanderInfo,filters);
    console.log(allFilteredGames);




    // Functions
    const toggleFilter = () => {
        console.log(toggleYear)
        setToggleYear( () => !toggleYear)
    };

    const toggleYearsUpdate = (buttonNr) => {
        if (toggleYear) {
            setButtonsActive(prev => {
                const updatedButtons = [false,false,false,false,false];
                updatedButtons[buttonNr] = !prev[buttonNr];
                return updatedButtons
            });
        } else  {
            setButtonsActive(prev => {
                const updatedButtons = [...prev];
                updatedButtons[buttonNr] = !prev[buttonNr];
                return updatedButtons
            })
        };
    };

    const handleAllYears = () => {
        setButtonsActive([false,false,false,false,false]);
    }

    const handleFilterMatchesPlayer = (player) => {
        setPlayer(player);
        setFilters({
            ...filters,
            playerFilter: [player]            
        })
    };

    useEffect(()=> {
        const fetchCommanderData = async () => {
            const data = await ScryFallAPIConnector.getSingleCommanderData(commanderName);
            if (data.message){
                setError({status: true, message: data.message});
            };
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
            <Col md={12} style={{ height:"5.8rem" }}>
                <Header toggleYear={ toggleYear } toggleFilter={ toggleFilter }
                        yearChoice={ true } matches={ filteredMatchesByPlayer } 
                        buttonsActive={ buttonsActive }
                        toggleYearsUpdate={ toggleYearsUpdate }
                        handleAllYears={ handleAllYears }

                        active={ true }
                        handleFilterMatchesPlayer={ handleFilterMatchesPlayer }
                        matchResultsForCommander={ matchResultsForCommander }
                        />
            </Col>
            
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
                </Row>
            </Col>

            {/* Picture of Commander and InfoBox */}
            <Col md={3} className="d-flex justify-content-center text-center ">
                <SingleCommanderInfoWindow cardData={ cardData } cardImages={ cardImages } error={ error } loading={ loading } matchResultsForCommander={ matchResultsForCommander } />
            </Col>

            {/* Graphs and Info */}
            <Col md={9}>
                <Row className="m-3">
                    <Col md={5} className="d-flex flex-column text-center">
                        <p className="bg-light border rounded">Played a total of { totalGames } times!</p>
                        <EntityScore matchResultsForEntity={ matchResultsForCommmanderFILTERED } totalGames={ totalGames } years={ year } />
                    </Col>
                    <Col md={7} style={{height:"20rem"}} >
                        <DoughnutChart results={ matchResultsForCommmanderFILTERED } years={ year }/>
                    </Col>
                </Row>

                {/* Line Chart */}
                <Row className="m-3" >
                    <Col className="d-flex align-items-stretch justify-content-center" style={{height:"13rem"}}  >
                        <LineChart entityName={ commanderName } entityMatches={ filteredMatches } />
                    </Col>
                </Row>
            </Col>

            {/* Games Played and Results */}
            <Col md={12} className="border border-5 border-black round-end">
                <MatchInfoBox matchDetails={ filteredMatches } focus={ commanderName } />
            </Col>
            
        </Row>

    )
}




