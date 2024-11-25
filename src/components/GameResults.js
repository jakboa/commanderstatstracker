import React from "react";
import { Link } from "react-router-dom";



export default function GameResults() {

    return (
        <div className="gameresults">
            <p>This is GameResults.</p>
            <Link to="/playerstats">Go to PlayerStats</Link><br/>
        </div>

    );
}