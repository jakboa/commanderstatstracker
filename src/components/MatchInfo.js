import React from "react";



export default function MatchInfo( { matchDetails } ) {

    matchDetails.players.sort((a, b) => a.placement - b.placement);

    return (
        <>
            { matchDetails.players.map(results => {
                return (
                    <p>Player: {results.nickName} Played: {results.commander} and got {results.placement}</p>
                )
            })

            }
            
        </>
    );
};

