import React from "react";


import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function PlayerSelector({ active, handleFilterMatchesPlayer, matchResultsForCommander }) {

    return (
        <>
        { active ? (
            <>
                <p>Filter Players:</p>
                <Button onClick={ handleFilterMatchesPlayer } value={ "allPlayers" } >All Players</Button>
                { matchResultsForCommander.players.map((player, index) => {
                    return (
                        <Col key={index}>
                            <Button onClick={ handleFilterMatchesPlayer } value={ player } >{player}</Button>
                        </Col>
                    )})
                }
            </> 
        ) : (
            <></>
        )

        }
  
        </>
    )
}

