import React from "react";






export default function PlayerInfoBox( { commanderData, loading, year, matchResultsForPlayer } ) {

    const creatureCount = {};
    commanderData.forEach( commander => {
        commander.types.forEach(commanderTypes => {
            if (!creatureCount[commanderTypes]) {
                creatureCount[commanderTypes] = 0
            }
            creatureCount[commanderTypes] ++
        })
    })
    const showCreatureTypes = Object.entries(creatureCount).sort((a,b) =>  b[1] - a[1])

    console.log(matchResultsForPlayer);

    const bestYear = Object.entries(matchResultsForPlayer).slice(0,-1).map(year => {
        return [year[0], year[1][1], year[1]["games"], Math.round((year[1][1]/year[1]["games"])*100)]
    }).sort((a,b) => b[3] - a[3]);

    console.log(bestYear);

    return (
        <div>
            {loading ? (
                <p>...loading</p>
            ) : (
                <>
                    <div className="border mb-1">
                        <h5>Commander with most wins:</h5>
                        <p>COMMANDER with X wins!</p>
                    </div>
                    <div className="border mb-1">
                        <h5>Most played commander:</h5>
                        <p>COMMANDER with X games!</p>
                    </div>
                    <div className="border mb-1">
                        <h5>Best year:</h5>
                        <p>Your best year was {bestYear[0][0]} with {bestYear[0][3]}% winrate!</p>
                    </div>
                    <div className="border">
                        <h5>Most used Creature types:</h5>
                        <p>1: {showCreatureTypes[0][0]} used {showCreatureTypes[0][1]} times.</p>
                        <p>2: {showCreatureTypes[1][0]} used {showCreatureTypes[1][1]} times.</p>
                        <p>3: {showCreatureTypes[2][0]} used {showCreatureTypes[2][1]} times.</p>
                    </div>
                </>
            )}

        </div>
    )
};