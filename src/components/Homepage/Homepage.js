import React from "react";
import './homepage.css';
import HomepageGroups from "./HomepageGroups";
import HomepagePlayers from "./HomepagePlayers";
import HomepageCommanders from "./HomepageCommanders";

export default function Homepage() {

    return (
        <div className="homepage">
            <HomepageGroups />
            
            <HomepagePlayers />

            <HomepageCommanders />
            
        </div>
    );
}