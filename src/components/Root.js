import React from "react";
import './Root.css';
import { Outlet, NavLink } from "react-router-dom";
import Footer from "./Footer";




export default function Root() {
    
    return (
        <div>
            <h1>Hello!</h1>
            {/* THIS (NavLink) gives class so i can css that shit, very nice! */ }
            <NavLink to="/gameresults">Nav GAME</NavLink><br/>
            <NavLink to="/playerstats">NAV STATS</NavLink><br />
            <NavLink to="/commanders">NAV COMMANDERS</NavLink>
            <p>This works.</p>
            <Outlet />
            <Footer />
        </div>
    ) 
} 



