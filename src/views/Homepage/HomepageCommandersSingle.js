import React from "react";
import { Link } from "react-router-dom";


export default function HomepageCommandersSingle( { name } ) {

    return (
        <Link to={`/commanders/${name}`}>{name}</Link>
    );
};