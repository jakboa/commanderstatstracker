import React from "react";
import SearchHandler from "../../components/SearchHandler";



export default function GroupScore( { scoreInfo } ) {

    const groupStats = SearchHandler.getGroupStats(scoreInfo);
    console.log(groupStats);


    return (
        <div className="d-flex-inline flex-grow-1 border border-white rounded m-2 bg-light">
            <p>This is the stats so far:</p>
            { Object.entries(groupStats).map(([key,value]) => {
                return (
                    <p>{`${key}: First: ${value[1]} Second: ${value[2]} Third: ${value[3]} Fourth: ${value[4]}`}</p>
                );
            })} 
            

        </div>
    );
};