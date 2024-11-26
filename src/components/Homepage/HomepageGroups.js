import React, {useState} from "react";
import './homepage.css';
import SearchHandler from "../SearchHandler";
import HomepageGroupSingle from "./HomepageGroupSingle";


export default function HomepageGroups() {

    const [commanderGroups] = useState(SearchHandler.getAllGroups);


    return (
        <div className="homepage_groups">
            <p>Here I put groups!</p>
            {commanderGroups.map(groupName => {
                return (
                    <HomepageGroupSingle name={groupName} />
                );
            })}
        </div>
    )
};








