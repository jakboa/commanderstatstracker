import React, { useState } from "react";
import HomepageCommanderSingle from "./HomepageCommandersSingle";
import SearchHandler from "../SearchHandler";

export default function HomepageCommanders() {
    const [commanders] = useState(SearchHandler.getAllCommanders);

    return (
        <div className="homepage_commanders">
            <p>Here I put Commanders!</p>
            { commanders.map(commander => {
                return (
                    <HomepageCommanderSingle name={ commander } />
                )
            })
            }
        </div>
    );

};