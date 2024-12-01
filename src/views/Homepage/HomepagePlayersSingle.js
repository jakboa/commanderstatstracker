import React from "react";
import { Link } from "react-router-dom";



export default function HomepagePlayersSingle( { name } ) {

    return (
        <div>
            <Link to={`/playerstats/${name}`}>{name}</Link>
        </div>
    );
};









