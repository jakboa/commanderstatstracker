import React from "react";
import './Roo.css';
import { Outlet, NavLink } from "react-router-dom";




export default function Root() {
    
    return (
        <div>
            <h1>Hello!</h1>
            {/* THIS gives class so i can css that shit, very nice! */ }
            <NavLink to="/gameresults">Nav GAME</NavLink><br/>
            <NavLink to="/playerstats">NAV STATS</NavLink>
            <p>This works.</p>
            <Outlet />
        </div>
    ) 
} 



