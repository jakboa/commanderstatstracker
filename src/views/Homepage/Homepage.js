import React, { useEffect, useState } from "react";
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
    const [searchPlayers, setSearchPlayers] = useState(players);
    const [searchTextPlayers, setSearchTextPlayers] = useState("");

    const [commanders] = useState(SearchHandler.getAllCommanders);
    const [searchCommanders,setSearchCommanders] = useState(commanders);
    const [searchTextCommanders,setSearchTextCommanders] = useState("");


    // Handles Search for Player
    const handlePlayerSearch = (e) => {
        setSearchTextPlayers(e.target.value);
        console.log(players)
        console.log(searchPlayers)
    };
    // useEffect to make sure it updates the search.
    useEffect(() =>{
        setSearchPlayers(SearchHandler.findPlayer(searchTextPlayers))
    },[searchTextPlayers])


    // Handles Search for Commander
    const handleCommanderSearch = (e) => {
        setSearchTextCommanders(e.target.value);
        console.log(searchTextCommanders)
    };
    // useEffect to make sure it updates the search.
    useEffect(()=>{
        setSearchCommanders(SearchHandler.findCommander(searchTextCommanders))
    },[searchTextCommanders])

    return (
        
            <Container fluid className="homepage" >
                
                <HomepageGroups commanderGroups={ commanderGroups } />
                
                <HomepagePlayers 
                    players={players}
                    handlePlayerSearch={ handlePlayerSearch }
                    searchPlayers={ searchPlayers }
                    searchTextPlayers={ searchTextPlayers } />
                
                <HomepageCommanders  
                    commanders={ commanders } 
                    handleCommanderSearch={ handleCommanderSearch } 
                    searchTextCommanders={ searchTextCommanders }
                    searchCommanders={ searchCommanders } />
            
            </Container>
    );
}