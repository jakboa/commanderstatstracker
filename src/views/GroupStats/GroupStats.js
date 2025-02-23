import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import GroupLineChart from "./GroupLineChart";
import GroupDoughnutChart from "./GroupDoughnutChart";
import Header from "../../components/header/Header";

import "./GroupPage.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GroupStats() {



    // useStates
    const [buttonsActive, setButtonsActive] = useState([false,false,false,false,false]);
    const year  = SearchHandler.getYearButtons(buttonsActive);
    const [toggleYear, setToggleYear] = useState(true);

    // Derived Values
    const { groupname } = useParams();
    const group = SearchHandler.getOneGroup(groupname);
    const filteredGroup = SearchHandler.getEntityMatchesForYear(group, year);

    const totalGames = filteredGroup.length; 

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
                </Row>
            </Col>

            {/* INFOBOX */}
            <Col md={3} className="d-flex text-center">
                <GroupInfo groupname={ groupname } group={ filteredGroup }  />
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
        </Row>
    );
};

