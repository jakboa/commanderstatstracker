import React from "react";



export default function PlayerInfoBox( { commanderData, loading, year, matchResultsForPlayer } ) {


    console.log(commanderData);

    const bestYear = Object.entries(matchResultsForPlayer).slice(0,-1).map(year => {
        return [year[0], year[1][1], year[1]["games"], Math.round((year[1][1]/year[1]["games"])*100)]
    }).sort((a,b) => b[3] - a[3]);

    const groups = Array.from(matchResultsForPlayer.groups);

    const commanderMostWins = commanderData.toSorted((a,b)=> b.matchHistory[year][1] - a.matchHistory[year][1]).slice(0,1);

    const commanderMostPlayed = commanderData.toSorted((a,b)=> b.matchHistory[year].games - a.matchHistory[year].games).slice(0,1);

    return (
        <div>
            {loading ? (
                <p>...loading</p>
            ) : (
                <>
                    <div className="border rounded-3 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Part of these groups:</h5>
                        <div className="d-flex justify-content-center">
                        {
                            groups.map((group,index) => {
                                return (
                                    <p key={index} className="border px-2 bg-light rounded px-2 py-1">{group}</p>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Commander with most wins:</h5>
                        <p>{commanderMostWins[0].name} with {commanderMostWins[0].matchHistory[year][1]} wins!</p>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Most played commander:</h5>
                        <p>{commanderMostPlayed[0].name} with {commanderMostPlayed[0].matchHistory[year].games} games!</p>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Best year:</h5>
                        <p>Your best year was {bestYear[0][0]} with {bestYear[0][3]}% winrate!</p>
                    </div>
                </>
            )}

        </div>
    )
};



/*Might move this somewhere else later

    const creatureCount = {};
    commanderData.forEach( commander => {
        commander.types.forEach(commanderTypes => {
            if (!creatureCount[commanderTypes]) {
                creatureCount[commanderTypes] = 0
            }
            creatureCount[commanderTypes] ++
        });
    });
    const showCreatureTypes = Object.entries(creatureCount).sort((a,b) =>  b[1] - a[1]);





                    <div className="border">
                        <h5>Most used Creature types:</h5>
                        <p>1: {showCreatureTypes[0][0]} used {showCreatureTypes[0][1]} times.</p>
                        <p>2: {showCreatureTypes[1][0]} used {showCreatureTypes[1][1]} times.</p>
                        <p>3: {showCreatureTypes[2][0]} used {showCreatureTypes[2][1]} times.</p>
                    </div>


*/