import React from "react";
import HomepageCommanderSingle from "./HomepageCommandersSingle";


export default function HomepageCommanders( { commanders } ) {
    

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