import React from "react";

import "./components.css";


//"d-flex flex-column align-items-center bg-light-subtle border border-white border-5 rounded-5"

export default function EntityScore( { results, totalGames } ) {

    return (
        <div className="d-flex flex-column h-100 bg-light-subtle border border-white rounded-5">
            <p>Match Results thus far:</p>
            { results.map((results, placement) => {
                return (
                    <p>You have gotten {placement+1}: {results} = {Math.round((results/totalGames)*100)}%</p>
                );
            })}
            
        </div>
    );
};





