import React, {act, useState} from "react";
import SearchHandler from "../SearchHandler";

import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function PlayerSelector({ active, handleFilterMatchesPlayer, matchResultsForCommander }) {

    const [activeFilter, setActiveFilter] = useState(SearchHandler.getPlayerFilterButtons(active, matchResultsForCommander));

    console.log(activeFilter);

    const handlePlayerClick = (player,index) => {
        handleFilterMatchesPlayer(player);
        setActiveFilter(prev => {
            const updateToggle = prev.fill(false); 
            updateToggle[index] = !prev[index];
            return updateToggle;
        })
    };

    return (
        <>
        { active ? (
            <div>
                <h4 className="d-inline-flex pe-2">Filter Players:</h4>
                <ButtonGroup >
                {matchResultsForCommander.players.length > 1 ? (
                    <Button onClick={() => handlePlayerClick("allPlayers",0) } value={ "allPlayers" }
                        className={`${activeFilter[0] ? "bg-success border-success" : "bg-danger border-danger"}`} >All Players</Button>
                ) : (
                    <></>
                )}
                
                
                { matchResultsForCommander.players.map((player, index) => {
                    return (
                        <Button className={`${activeFilter[index+1] ? "bg-success border-success" : "bg-danger border-danger"}`}
                            key={index} onClick={ () => handlePlayerClick(player,index+1) } value={ player }>{player}</Button>
                    )})
                }
                </ButtonGroup>
            </div> 
        ) : (
            <></>
        )

        }
  
        </>
    )
}

