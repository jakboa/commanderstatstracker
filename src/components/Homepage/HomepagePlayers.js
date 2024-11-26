import React, { useState } from "react";
import HomepagePlayersSingle from "./HomepagePlayersSingle";
import SearchHandler from "../SearchHandler";

export default function HomepagePlayers() {
    const [players] = useState(SearchHandler.getAllPlayers);


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