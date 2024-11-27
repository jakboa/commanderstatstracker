import React from "react";
import HomepagePlayersSingle from "./HomepagePlayersSingle";


export default function HomepagePlayers( { players } ) {

    return (
        <div className="homepage_players">
            <p>Here I put Players!</p>
            { players.map(player => {
                return (
                    <HomepagePlayersSingle name={player} />
                )
            })
            }
        </div>
    );

};