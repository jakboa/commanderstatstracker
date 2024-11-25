import React from "react";
import { Link, Outlet } from "react-router-dom";
import { gameInfo } from "../MockData";



export default function PlayerStats() {

    let playersFound = [];
    gameInfo.map(games =>  
        games.players.map( player => 
            playersFound.push( player.nickName)
        ))
    playersFound = [...new Set(playersFound)]
    console.log(playersFound);

    return (
        <div className="playerstats">
            <p>This is PlayerStats</p>
            {playersFound.map(player => {
                return (<Link to={`${player}`}>{player}</Link>)
            })}
            <Link to="/gameresults">Go to GameResults</Link><br/>
            <Outlet />
        </div>
    )
}