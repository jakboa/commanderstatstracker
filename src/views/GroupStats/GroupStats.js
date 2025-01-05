import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import GroupLineChart from "./GroupLineChart";
import GroupDoughnutChart from "./GroupDoughnutChart";
import YearSelector from "../../components/YearSelector";

import "./GroupPage.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GroupStats() {

    // useStates
    const [year, setYear] = useState('allMatches');

    // Derived Values
    const { groupname } = useParams();
    const group = SearchHandler.getOneGroup(groupname);
    const filteredGroup = SearchHandler.getEntityMatchesForYear(group, year);

    const totalGames = filteredGroup.length; 

    // Functions
    const handleFilterMatches = (e) =>{
        setYear(e);
    };

    return (
        <Row className="groupPage">

            {/* BANNER */}
            <Col md={12} className="bg-info-subtle" style={{height:"7rem"}}>
            <Row className="h-100 border">
                <Col>
                    <h1>{groupname}</h1>
                </Col>
                <Col className="d-flex justify-content-end align-items-end">
                    <div >
                        <YearSelector matches={ group } handleFilterMatches={handleFilterMatches} />
                    </div>
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
                        <p className="border bg-light rounded m-2">Total games: {group.length}</p>
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

