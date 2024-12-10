import React, { useState } from "react";
//import './homepage.css';
import HomepageGroups from "./HomepageGroups";
import HomepagePlayers from "./HomepagePlayers";
import HomepageCommanders from "./HomepageCommanders";

import SearchHandler from '../../components/SearchHandler';

import Container from "react-bootstrap/Container";

export default function Homepage() {

    // Gets all Groups, Players and Commanders so user can 
    // quickly find the information they want.
    const [commanderGroups] = useState(SearchHandler.getAllGroups);
    const [players] = useState(SearchHandler.getAllPlayers);
    const [commanders] = useState(SearchHandler.getAllCommanders);


    return (
        
            <Container fluid className="homepage" >
                <HomepageGroups commanderGroups={ commanderGroups } />
            
                <HomepagePlayers players={players} />

                <HomepageCommanders commanders={ commanders } />
            
            </Container>
    );
}