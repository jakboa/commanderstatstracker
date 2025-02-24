import React, {useState} from "react";
import SearchHandler from "../SearchHandler";

import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function PlayerSelector({ active, handleFilterMatchesPlayer, matchResultsForCommander }) {

    const [activeFilter, setActiveFilter] = useState(SearchHandler.getPlayerFilterButtons(active, matchResultsForCommander));

    return (
        <>
        { active ? (
            <div>
                <h4 className="d-inline-flex pe-2">Filter Players:</h4>
                <ButtonGroup >
                {matchResultsForCommander.players.length > 1 ? (
                    <Button onClick={ handleFilterMatchesPlayer } value={ "allPlayers" } >All Players</Button>
                ) : (
                    <></>
                )}
                
                
                { matchResultsForCommander.players.map((player, index) => {
                    return (
                        <Button key={index} onClick={ handleFilterMatchesPlayer } value={ player }>{player}</Button>
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

