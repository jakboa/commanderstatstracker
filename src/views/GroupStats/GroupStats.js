import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import "./GroupPage.css";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function GroupStats() {

    const { groupname } = useParams();
    const [year, setYear] = useState('allGames');

    const [group] = useState(SearchHandler.getOneGroup(groupname));
    const [filteredGroup, setFilteredGroup] = useState(group);

    useEffect(()=>{
        setFilteredGroup(SearchHandler.getEntityMatchesForYear(group,year))
    },[group,year]);

    return (
        <Row className="bordertest groupPage">

            <Col md={2} className="border-end border-3 border-black groupFacts">
                <p>Her er groupINFO:</p>
                <GroupInfo group={group} /> 
            </Col>




            {/* Here i put Graphs and stuff */}
            <Col ms={10} className="text-center">
                <p>Total amount of games so far: {group.length}</p>
                <p>This is the stats so far:</p>
                <GroupScore scoreInfo={group} />
            </Col>

            <Col md={12} className="border-top border-3 border-black matchInsert groupMatches">
                <h1 className="text-center">Match Results for {groupname}</h1>
                <Tabs
                    defaultActiveKey="allGames"
                    transition={true}
                    onSelect={(k) => {setYear(k)}}
                    className="mb-3">
                    <Tab eventKey="allGames" title="All Games">All matches this group has played:</Tab>
                    <Tab eventKey="2024" title="2024">Matches played in 2024:</Tab>
                    <Tab eventKey="2023" title="2023">Matches played in 2023:</Tab>
                    <Tab eventKey="2022" title="2022">Matches played in 2022:</Tab>
                </Tabs>
                <MatchInfoBox matchDetails={filteredGroup} />
            </Col>

        </Row>
    );
};

