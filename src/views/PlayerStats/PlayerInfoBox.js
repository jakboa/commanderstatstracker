import React from "react";

import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

export default function PlayerInfoBox( { commanderData, loading, years, matchResultsForPlayer } ) {

    const navigate = useNavigate();

    const goToGroup = (e) => {
        navigate(`/groupstats/${e.target.value}`)
    };


    const combineEur = commanderData.map(commanderPrice => Number(commanderPrice.price)).reduce(
        (accumulator, currentValue) => accumulator + currentValue,0,).toFixed(2);

  
    
    const bestYear = Object.entries(matchResultsForPlayer).slice(0,-1).map(year => {
        return [year[0], year[1][1], year[1]["games"], Math.round((year[1][1]/year[1]["games"])*100)]
    }).sort((a,b) => b[3] - a[3]);

    
    const getCardMostInfo = () => {
        let highestWin = 0;
        let highestWinCommander = undefined;

        let mostPlayed = 0;
        let mostPlayedCommander = undefined;

        commanderData.forEach((commander) => {
            let allWins = 0;
            let allGames = 0;
            years.forEach(year => {
                if (commander.matchHistory[year]){
                    allWins += commander.matchHistory[year][1];
                    allGames += commander.matchHistory[year]["games"];
                }
            });

            if (allWins >= highestWin ) {
                    highestWin = allWins;
                    highestWinCommander = commander;
                    commander.matchHistory.allWins = allWins;
            };

            if (allGames >= mostPlayed ) {
                    mostPlayed = allGames;
                    // This mutates the original, but unsure if I should care.
                    // Need to do some research.
                    mostPlayedCommander = commander;
                    commander.matchHistory.mostPlayed = mostPlayed;
            };

        })
        
        return [highestWinCommander,mostPlayedCommander]
    }


    const [commanderMostWins, commanderMostPlayed] = getCardMostInfo();




    //const commanderMostWins = commanderData.toSorted((a,b)=> b.matchHistory[year][1] - a.matchHistory[year][1]).slice(0,1);
    //const commanderMostPlayed = commanderData.toSorted((a,b)=> b.matchHistory[year].games - a.matchHistory[year].games).slice(0,1);



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
                            matchResultsForPlayer.groups.map((group,index) => {
                                return (
                                    <Button key={index} onClick={ goToGroup } value={ group } className="px-2 rounded px-2 py-1 m-1 mb-2">{group}</Button>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Commander with most wins:</h5>
                        <p>{commanderMostWins.name} with {commanderMostWins.matchHistory.allWins} wins!</p>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Most played commander:</h5>
                        <p>{commanderMostPlayed.name} with {commanderMostPlayed.matchHistory.mostPlayed} games!</p>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Best year:</h5>
                        <p>Your best year was {bestYear[0][0]} with {bestYear[0][3]}% winrate!</p>
                    </div>
                    <div className="rounded-3 pb-1 mb-2" style={{background:"#78B2F4"}}>
                        <h5 className="rounded-top pb-1" style={{background:"#6698D1"}}>Combined Commander Cost:</h5>
                        <p>Your Commanders combined are currently worth: {combineEur}€!</p>
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