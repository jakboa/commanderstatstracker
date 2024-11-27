import React from "react";
import './homepage.css';

import HomepageGroupSingle from "./HomepageGroupSingle";


export default function HomepageGroups( { commanderGroups } ) {

    return (
        <div className="homepage_groups">
            <p>Here I put groups!</p>
            {commanderGroups.map(group => {
                return (
                    <HomepageGroupSingle groupName={group[0]} groupPlayers={group[1]} />
                );
            })}
        </div>
    )
};








