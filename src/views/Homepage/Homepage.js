import React, { useReducer, useState, useEffect } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";


//import './homepage.css';
import HomepageGroups from "./HomepageGroups";
import HomepagePlayers from "./HomepagePlayers";
import HomepageCommanders from "./HomepageCommanders";

import SearchHandler from '../../components/SearchHandler';
import Header from "../../components/header/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const data = [
    { name: "A", value: 40, color: "#FF5733" },
    { name: "B", value: 30, color: "#33FF57" },
    { name: "C", value: 20, color: "#3357FF" },
    { name: "D", value: 10, color: "#F0C808" },
  ];
  
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;




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
    const [arcs, setArcs] = useState([]);

    useEffect(() => {

        const pie = d3.pie().value((d) => d.value);
        const arcData = pie(data);
    

        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    

        const calculatedArcs = arcData.map((d, i) => ({
          path: arcGenerator(d),
          labelPos: arcGenerator.centroid(d),
          value: d.data.value,
          percentage: ((d.data.value / d3.sum(data, (d) => d.value)) * 100).toFixed(1) + "%",
          color: d.data.color,
        }));
    
        setArcs(calculatedArcs);
      }, []);

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

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#9911ff",
        borderRadius: 5,
    }


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
                <Col className="my-3">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    style={box}
                />
                    <svg width={width} height={height} viewBox="-150 -150 300 300">
      {arcs.map((arc, i) => (
        <g key={i}>
          {/* Animert wedge */}
          <motion.path
            d={arc.path}
            fill={arc.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          />
          {/* Prosenttekst midt i wedge */}
          <motion.text
            x={arc.labelPos[0]}
            y={arc.labelPos[1]}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.5 }}
          >
            {arc.percentage}
          </motion.text>
        </g>
      ))}
    </svg>
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