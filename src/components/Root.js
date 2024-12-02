import React from "react";
import './Root.css';
import { Outlet } from "react-router-dom";
import Footer from "./Footer";


// Old links, keeping them here for now. obs, need to import NavLink need to be used!
//<NavLink to="/playerstats">NAV STATS</NavLink><br />
//<NavLink to="/commanders">NAV COMMANDERS</NavLink>


export default function Root() {
    
    return (
        <div>
            <h1>Hello!</h1>
            {/* THIS (NavLink) gives class so i can css that shit, very nice! */ }
            <p>This works.</p>
            <Outlet />
            <Footer />
        </div>
    ) 
} 



