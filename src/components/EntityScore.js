import React from "react";


export default function EntityScore( { results, totalGames } ) {

    return (
        <>
            <p>Match Results thus far:</p>
            { results.map((results,placement) => {
                return (
                    <p>You have gotten {placement+1}: {results} = {Math.round((results/totalGames)*100)}%</p>
                );
            })}
            
        </>
    );
};





