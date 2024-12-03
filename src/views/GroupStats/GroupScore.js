import React from "react";
import SearchHandler from "../../components/SearchHandler";



export default function GroupScore( { scoreInfo } ) {

    const groupStats = SearchHandler.getGroupStats(scoreInfo);



    return (
        <>
            <p>This works</p>
            { Object.entries(groupStats).map(([key,value]) => {
                return (
                    <p>{`${key}: First: ${value[1]} Second: ${value[2]} Third: ${value[3]} Fourth: ${value[4]}`}</p>
                );
            })} 
            

        </>
    );
};