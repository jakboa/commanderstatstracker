import React, { useReducer } from "react";
import { motion } from "framer-motion";

import invasion_of_fiora from "../../utils/invasion_of_fiora.jpg"

//import './homepage.css';
import HomepageGroups from "./HomepageGroups";
import HomepagePlayers from "./HomepagePlayers";
import HomepageCommanders from "./HomepageCommanders";

import SearchHandler from '../../components/SearchHandler';
import Header from "../../components/header/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";





const initalHomepage = {
    group:{
        playGroups: SearchHandler.getAllGroups(),
        searchGroup: SearchHandler.getAllGroups(),
        searchTextGroups: ""
    },
    player:{
        players: SearchHandler.getAllPlayers(),
        searchPlayers: SearchHandler.getAllPlayers(),
        searchTextPlayers: ""
    },
    commander:{
        commanders: SearchHandler.getAllCommanders(),
        searchCommanders: SearchHandler.getAllCommanders(),
        searchTextCommanders: ""
    },
    results: SearchHandler.getEntityCardInfo()

};

const reducer = (state, action) =>  {
    switch (action.type) {
        case "searchGroup":
            const groupText = action.search;
            return { ...state, 
                group: {
                    ...state.group,
                    searchTextGroups: groupText,
                    searchGroup: SearchHandler.findGroup(groupText, state.group.playGroups)
                } }


        case "searchPlayer":
            const playerText = action.search;
            return { ...state, 
                player: {
                    ...state.player,
                    searchTextPlayers: playerText,
                    searchPlayers: SearchHandler.findPlayer(playerText, state.player.players)
                } }

        case "searchCommander":
            const commanderText = action.search;
            return { ...state, 
                commander: {
                    ...state.commander,
                    searchTextCommanders: commanderText,
                    searchCommanders: SearchHandler.findCommander(commanderText, state.commander.commanders)
                } }

        case "removeSearch":
            const remove = action.search;
            return { ...state, 
                group: {
                    ...state.group,
                    searchTextGroups: remove,
                    searchGroup: SearchHandler.findGroup(remove, state.group.playGroups)
                },
                player: {
                    ...state.player,
                    searchTextPlayers: remove,
                    searchPlayers: SearchHandler.findPlayer(remove, state.player.players)
                },
                commander: {
                    ...state.commander,
                    searchTextCommanders: remove,
                    searchCommanders: SearchHandler.findCommander(remove, state.commander.commanders)
                }
            
            }
                
        default:
            return state;
    };
};


export default function Homepage() {

    const [homepage, dispatch] = useReducer(reducer, initalHomepage);

    const handleGroupSearch = (e) => {
        dispatch( { type:"searchGroup", search: e.target.value } );
    };

    const handlePlayerSearch = (e) => {
        dispatch( { type:"searchPlayer", search: e.target.value } );
    };

    const handleCommanderSearch = (e) => {
        dispatch( { type:"searchCommander", search: e.target.value } );
    };

    const handleClearSearch = () => {
        dispatch( { type:"removeSearch", search: "" } );
    };



    return (
        
            <Row className="d-flex justify-content-center aling-items-center" >
                
                <Col md={12} style={{ height:"3.8rem" }}>
                    <Header />
                </Col>
                {
                /*
                <Col className="bg-primary bg-gradient">
                    <HomepageIntro />
                </Col>
                */
                }
                <Col className="my-3 d-flex justify-content-center">


                <Card className="border">
                    <Card.Img alt="lyev_skyknight" src={invasion_of_fiora} />
                    <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center fw-bold fs-1 text-light">
                        <motion.div
                            initial={{ opacity:1, scale:2,  x:-300 }}
                            animate={{ opacity:2, scale:2, x:0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            >
                            <Card.Text className="">Commander</Card.Text>
                        </motion.div>
                        <motion.div className="mt-2"
                            initial={{ opacity:1, scale:2,  x:300 }}
                            animate={{ opacity:2, scale:2, x:0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            >
                            <Card.Text className="">Stats Tracker</Card.Text>
                        </motion.div>

                    </Card.ImgOverlay>
                </Card>


                </Col>
                <Col md={12} className="bg-light">
                <button onClick={handleClearSearch}>Clear Searches</button>
                    <HomepageGroups 
                        commanderGroups={ homepage.group.playGroups }
                        handleGroupSearch={ handleGroupSearch }
                        searchGroup={ homepage.group.searchGroup }
                        searchTextGroups={ homepage.group.searchTextGroups } />
                </Col>

                <Col md={12} className="bg-info bg-gradient">
                    <HomepagePlayers 
                        players={homepage.player.players}
                        handlePlayerSearch={ handlePlayerSearch }
                        searchPlayers={ homepage.player.searchPlayers }
                        searchTextPlayers={ homepage.player.searchTextPlayers }
                        results={ homepage.results } />
                </Col>
                <Col md={12} className="bg-white">
                    <HomepageCommanders  
                        commanders={ homepage.commander.commanders } 
                        handleCommanderSearch={ handleCommanderSearch } 
                        searchTextCommanders={ homepage.commander.searchTextCommanders }
                        searchCommanders={ homepage.commander.searchCommanders }
                        results={ homepage.results } />
                </Col>
            </Row>
    );
}