import React from "react";
import { Link } from "react-router-dom";



export default function PlayerStats() {
    return (
        <div className="playerstats">
            <p>This is PlayerStats</p>
            <Link to="/gameresults">Go to GameResults</Link><br/>
        </div>
    )
}