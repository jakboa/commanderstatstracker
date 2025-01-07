import React from "react";






export default function PlayerInfoBox( { commanderStatsInfo, loading } ) {

    const creatureCount = {};
    commanderStatsInfo.forEach( commander => {
        commander.types.forEach(commanderTypes => {
            if (!creatureCount[commanderTypes]) {
                creatureCount[commanderTypes] = 0
            }
            creatureCount[commanderTypes] ++
        })
    })
    const showCreatureTypes = Object.entries(creatureCount).sort((a,b) =>  b[1] - a[1])


    return (
        <div>
            {loading ? (
                <p>...loading</p>
            ) : (
                <>
                    <h5>Most used Creature types:</h5>
                    <p>1: {showCreatureTypes[0][0]} used {showCreatureTypes[0][1]} times.</p>
                    <p>2: {showCreatureTypes[1][0]} used {showCreatureTypes[1][1]} times.</p>
                    <p>3: {showCreatureTypes[2][0]} used {showCreatureTypes[2][1]} times.</p>
                </>
            )}

        </div>
    )
};