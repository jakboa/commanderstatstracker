import React, { useEffect, useState } from "react";
//import './homepage.css';
import HomepageGroups from "./HomepageGroups";
import HomepagePlayers from "./HomepagePlayers";
import HomepageCommanders from "./HomepageCommanders";
import SearchHandler from '../../components/SearchHandler';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Homepage() {

    // Gets all Groups, Players and Commanders so user can 
    // quickly find the information they want.
    const [commanderGroups] = useState(SearchHandler.getAllGroups);
    const [searchGroup, setSearchGroup] = useState(commanderGroups);
    const [searchTextGroups, setSearchTextGroups] = useState("");
    
    const [players] = useState(SearchHandler.getAllPlayers);
    const [searchPlayers, setSearchPlayers] = useState(players);
    const [searchTextPlayers, setSearchTextPlayers] = useState("");

    const [commanders] = useState(SearchHandler.getAllCommanders);
    const [searchCommanders,setSearchCommanders] = useState(commanders);
    const [searchTextCommanders,setSearchTextCommanders] = useState("");


    // Handles Search for Groups
    const handleGroupSearch = (e) => {
        setSearchTextGroups(e.target.value);
        console.log(commanderGroups)
        console.log(searchGroup)
    };
    // useEffect to make sure it updates the search.
    useEffect(() =>{
        setSearchGroup(SearchHandler.findGroup(searchTextGroups,commanderGroups))
    },[searchTextGroups,commanderGroups])



    // Handles Search for Player
    const handlePlayerSearch = (e) => {
        setSearchTextPlayers(e.target.value);
    };
    useEffect(() =>{
        setSearchPlayers(SearchHandler.findPlayer(searchTextPlayers))
    },[searchTextPlayers])



    // Handles Search for Commander
    const handleCommanderSearch = (e) => {
        setSearchTextCommanders(e.target.value);
    };
    useEffect(()=>{
        setSearchCommanders(SearchHandler.findCommander(searchTextCommanders))
    },[searchTextCommanders])

    return (
        
            <Row fluid className="d-flex justify-content-center aling-items-center" >
                <Col md={12} className="homepageGroups">
                    <HomepageGroups 
                        commanderGroups={ commanderGroups }
                        handleGroupSearch={ handleGroupSearch }
                        searchGroup={ searchGroup }
                        searchTextGroups={ searchTextGroups } />
                </Col>

                <Col md={12} className="homepagePlayers">
                    <HomepagePlayers 
                        players={players}
                        handlePlayerSearch={ handlePlayerSearch }
                        searchPlayers={ searchPlayers }
                        searchTextPlayers={ searchTextPlayers } />
                </Col>
                <Col md={12} className="homepageCommanders">
                    <HomepageCommanders  
                        commanders={ commanders } 
                        handleCommanderSearch={ handleCommanderSearch } 
                        searchTextCommanders={ searchTextCommanders }
                        searchCommanders={ searchCommanders } />
                </Col>
            </Row>
    );
}