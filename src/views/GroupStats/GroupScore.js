import React from "react";
import SearchHandler from "../../components/SearchHandler";

import Stack from "react-bootstrap/Stack";


export default function GroupScore( { scoreInfo, totalGames } ) {

    const groupStats = SearchHandler.getGroupStats(scoreInfo);

    const sortByWins = (a, b) => {

        return b[1][1]-a[1][1]
        // Attempting som sorting stuff here, not quite there yet...
        //const [aFirst, aSecond, aThird, aFourth] = Object.values(a[1]);
        //const [bFirst, bSecond, bThird, bFourth] = Object.values(b[1]); 
        //return aFirst - bFirst || aSecond - bSecond || aThird - bThird || aFourth - bFourth ;
    }


    return (
        <div className="d-flex flex-column flex-grow-1 border border-white rounded m-2 bg-light">
            <h1>Match Results:</h1>
            <div className="px-2 pb-2 flex-grow-1">
                { Object.entries(groupStats).sort(sortByWins).map(([key,value], index) => {
                    return (
                            <Stack key={index} direction="horizontal" className={`h-25 place${index}`}>
                                <p className="scoreText border-end fw-bold">{`${key}`}</p> 
                                <p className="scoreText border-end fw-semibold">{`First: ${value[1]}`}</p> 
                                <p className="scoreText border-end fw-medium">{`Second: ${value[2]}`}</p> 
                                <p className="scoreText border-end">{`Third: ${value[3]}`}</p> 
                                <p className="scoreText">{`Fourth: ${value[4]}`}</p>   
                            </Stack>
                    );
                })} 
            </div>
        </div>
    );
};