import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import MatchInfoBox_copy from "../../components/MatchInfo_copy/MatchInfoBox_copy";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import GroupLineChart from "./GroupLineChart";
import GroupDoughnutChart from "./GroupDoughnutChart";
import Header from "../../components/header/Header";
import DatabaseAPIConnector from "../../utils/api/DatabaseAPIConnector";

import "./GroupPage.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import AddGroupMatch from "./AddGroupMatch";

export default function GroupStats() {



    // useStates
    const [buttonsActive, setButtonsActive] = useState([false,false,false,false,false]);
    const year  = SearchHandler.getYearButtons(buttonsActive);
    const [toggleYear, setToggleYear] = useState(true);
    const [showAddMatch, setShowAddMatch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [matchData, setMatchData] = useState({});

    // Derived Values
    const { groupname } = useParams();
    const group = SearchHandler.getOneGroup(groupname);
    const filteredGroup = SearchHandler.getEntityMatchesForYear(group, year);
    const groupInfo = SearchHandler.getGroupInfo(filteredGroup);

    const totalGames = filteredGroup.length; 

    console.log("HER ER OG GROUP:")
    console.log(filteredGroup)

    console.log("HER ER DATABASE GROUP:")
    console.log(matchData)


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
;
    };

    const handleAllYears = () => {
        setButtonsActive([false,false,false,false,false]);
    }

    useEffect(()=>{
        const getMatches = async () => {
            const matchResponse = await DatabaseAPIConnector.getMatches({filter:"group",searchFor:"A_boys"});
            setMatchData(matchResponse);
            setLoading(false);
        };

        getMatches();

    },[]) 

    return (
        <Row className="groupPage">
            <Col md={12} style={{ height:"3.8rem" }}>
                <Header toggleYear={ toggleYear } toggleFilter={ toggleFilter }
                    yearChoice={ true } matches={ group } 
                    buttonsActive={ buttonsActive }
                    toggleYearsUpdate={ toggleYearsUpdate }
                    handleAllYears={ handleAllYears } />
            </Col>

            {/* BANNER */}
            <Col md={12} className="bg-info-subtle" style={{height:"7rem"}}>
                <Row className="h-100 border">
                    <Col>
                        <h1>{groupname}</h1>
                    </Col>
                    <Col>
                        <Button onClick={() => setShowAddMatch(true)}>Add a new match to the group!</Button>
                        <AddGroupMatch groupname={ groupname } group={ groupInfo } show={showAddMatch} onHide={()=> setShowAddMatch(false)}/>
                    </Col>
                </Row>
            </Col>

            {/* INFOBOX */}
            <Col md={3} className="d-flex text-center">
                <GroupInfo groupname={ groupname } groupInfo={ groupInfo }  />
            </Col>

            {/* STATS AND GRAPHS */}
            <Col ms={9} className="text-center">
                <Row>
                    {/* STATS */}
                    <Col md={7} className="d-flex flex-column">
                        <p className="border bg-light rounded m-2">Total games: {totalGames}</p>
                        <GroupScore scoreInfo={ filteredGroup } totalGames={totalGames} />
                    </Col>

                    {/* DOUGHNUT */}
                    <Col md={5} style={{height:"22rem"}}>
                        <GroupDoughnutChart results={ filteredGroup } />
                    </Col>
                </Row>
                
                {/* LINECHART */}
                <Row>
                    <Col className="d-flex" style={{height:"15rem"}} >
                        <GroupLineChart entityName={ groupname } entityMatches={ filteredGroup } />
                    </Col>
                </Row>

            </Col>

            {/* GAMES PLAYED */}            
            <Col md={12} className="border-top border-3 border-black matchInsert groupMatches">
                <h1 className="text-center  mt-4">Match Results for {groupname}</h1>                
                <MatchInfoBox matchDetails={filteredGroup} />
            
            </Col>

            {/* GAMES PLAYED FROM DATABASE*/}
            {loading ? 
                <p>Loading...</p>
                :
            <Col md={12} className="border-top border-3 border-black matchInsert groupMatches">
                <h1 className="text-center  mt-4">Match Results for {groupname}</h1>                
                <MatchInfoBox_copy matchDetails={matchData} />
            
            </Col>
            }            
        </Row>
    );
};

