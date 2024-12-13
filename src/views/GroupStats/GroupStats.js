import React from "react";
import { useParams } from "react-router-dom";
import SearchHandler from "../../components/SearchHandler";
import MatchInfoBox from "../../components/MatchInfo/MatchInfoBox";
import GroupScore from "./GroupScore";
import GroupInfo from "./GroupInfo";
import "./GroupPage.css";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GroupStats() {

    const { groupname } = useParams();

    const group = SearchHandler.getOneGroup(groupname);

    return (
        <Container fluid className="bordertest">
            <Row className="bordertest">
                <Col md={2} className="bordertest">
                    <p>Her er groupINFO:</p>
                    <GroupInfo group={group} /> 
                </Col>
                <Col className="bordertest">
                    <h1 className="text-center">Match Results for {groupname}</h1>
                    <MatchInfoBox matchDetails={group} />
                </Col>
            </Row>
            <Row className="text-center">
                <p>Total amount of games so far: {group.length}</p>
                <p>This is the stats so far:</p>
                <GroupScore scoreInfo={group} />
            </Row>
        </Container>
    );
};

