import React from "react";


import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function PlayerSelector({ active, handleFilterMatchesPlayer, matchResultsForCommander }) {

    return (
        <>
        { active ? (
            <div>
                <h4 className="d-inline-flex pe-2">Filter Players:</h4>
                <ButtonGroup className="">
                <Button onClick={ handleFilterMatchesPlayer } value={ "allPlayers" } >All Players</Button>
                { matchResultsForCommander.players.map((player, index) => {
                    return (
                        <Button key={index} onClick={ handleFilterMatchesPlayer } value={ player } >{player}</Button>
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

