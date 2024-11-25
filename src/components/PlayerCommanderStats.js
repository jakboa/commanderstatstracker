import React from "react";
import { useParams } from "react-router-dom";
import { gameInfo } from "../MockData";



export default function PlayerCommanderStats() {

    const { commanders } = useParams();
    let commandersPlayed = [];
    gameInfo.map(match => match.players.map(player => {
        if (player.nickName === commanders) {
            commandersPlayed.push(player.commander);
        }
    }))
    commandersPlayed = [...new Set(commandersPlayed)]
    console.log(commandersPlayed);

    return (
        <div>
            <h1>HELLOO!</h1>
            <p>{commanders}</p>
            {commandersPlayed.map(commander => <p>{commander}</p>)}
        </div>
    );
}