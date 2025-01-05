import React from "react";
import SearchHandler from "../../components/SearchHandler";

import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import "./GroupPage.css"


export default function GroupInfo( { groupname, group } ) {

    const navigate = useNavigate();

    const goToPlayer = (e) => {
        console.log(e.target.value)
        navigate(`/playerstats/${e.target.value}`)
    };

    const groupInfo = SearchHandler.getGroupInfo(group);

    console.log(groupInfo)

    return (
        
            <Row className="d-flex flex-column w-100 bg-light border border-white rounded m-2 p-2">
                {/* BANNER */}
                <Col md={12} 
                    className="border rounded mb-1 "
                    style={{background:"#5C6ED1"}}>
                    <h3 >Info about {groupname}:</h3>
                </Col>

                {/* PLAYERS WITH LINK */}
                <Col className="border rounded d-flex flex-column align-items-center flex-fill mb-1 overflow-hidden"
                    style={{background:"#78B2F4"}}>
                    <h4 className="vw-100 pb-2" style={{background:"#6698D1"}}>Players:</h4>
                    <Row className="">
                    {groupInfo.arrayPlayerNicks.sort().map(nick => {
                        return (
                            <Col md={6} className="d-flex h-50">
                                <Button onClick={ goToPlayer } value={nick}
                                className="d-flex justify-content-center align-items-center m-1 w-100">
                                    {nick}</Button>
                            </Col>
                        );
                    })}
                    </Row>
                </Col>
                
                {/* FUN FACTS */}
                <Col className="p-0 rounded overflow-hidden flex-fill">
                    <h4 style={{background:"#6698D1"}} className="d-flex justify-content-center align-items-center m-0 h-25">Fun facts:</h4>

                    <div style={{background:"#C7D4F5"}} className="m-0 h-25">
                        <h6>Highest commander count:</h6>
                        <p>{groupInfo.countCommanders[0][0]} with {groupInfo.countCommanders[0][1]} unique commanders.</p>
                    </div>

                    <div style={{background:"#C7D4F5"}} className="m-0 h-25">
                        <h6>Commander with most wins:</h6>
                        <p>{groupInfo.sortedMostwinsCommander[0][0]} with {groupInfo.sortedMostwinsCommander[0][1].first} wins.</p>
                    </div>

                    <div style={{background:"#C7D4F5"}} className="m-0 h-25">
                        <h6>Most played commander:</h6>
                        <p>{groupInfo.sortedMostUsedCommanders[0][0]} with {groupInfo.sortedMostUsedCommanders[0][1].played} matches.</p>
                    </div>
                </Col>  
            </Row>
        
    );
};


