import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import GroupLineChart from "./GroupLineChart";
import GroupDoughnutChart from "./GroupDoughnutChart";
import "./GroupPage.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function GroupStats() {

    const { groupname } = useParams();
    const [year, setYear] = useState('allMatches');

    const [group] = useState(SearchHandler.getOneGroup(groupname));
    const [filteredGroup, setFilteredGroup] = useState(group);
    

    useEffect(()=>{
        setFilteredGroup(SearchHandler.getEntityMatchesForYear(group,year))
    },[group,year]);

    return (
        <Row className="groupPage">

            {/* BANNER */}
            <Col md={12} className="bg-info-subtle" style={{height:"5rem"}}>
                <h1>{groupname}</h1>
            </Col>

            {/* INFOBOX */}
            <Col md={2} className="d-flex">
                <Row className="d-flex flex-column text-center">
                    <Col>
                        <p className="bg-light border border-white rounded m-2">Her er groupINFO:</p>
                    </Col>
                    <Col>
                        <GroupInfo group={group} />
                    </Col>
                </Row> 
            </Col>

            {/* STATS AND GRAPHS */}
            <Col ms={10} className="text-center">
                <Row>
                    
                    {/* STATS */}
                    <Col md={6} className="d-flex flex-column">
                        <p className="border bg-light rounded m-2">Total amount of games so far: {group.length}</p>
                        <GroupScore scoreInfo={group} />
                    </Col>

                    {/* DOUGHNUT */}
                    <Col md={6} style={{height:"22rem"}}>
                        <GroupDoughnutChart results={group} />
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
                <Tabs
                    defaultActiveKey="allMatches"
                    transition={true}
                    onSelect={(k) => {setYear(k)}}
                    className="mb-3">
                    <Tab eventKey="allMatches" title="All Games">All matches this group has played:</Tab>
                    <Tab eventKey="2024" title="2024">Matches played in 2024:</Tab>
                    <Tab eventKey="2023" title="2023">Matches played in 2023:</Tab>
                    <Tab eventKey="2022" title="2022">Matches played in 2022:</Tab>
                </Tabs>
                
                <MatchInfoBox matchDetails={filteredGroup} />
            
            </Col>
        </Row>
    );
};

