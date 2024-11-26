import React from "react";
import { Link, useSearchParams } from "react-router-dom";


export default function Commanders() {
    
    const [searchParams, setSearchParams] = useSearchParams();


    return(
        <div>
            <h1>Commanders</h1>
            <p>Here be commanders!</p>        
        </div>
    );
};