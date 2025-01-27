import React from "react";
import './Root.css';
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

import Container  from "react-bootstrap/Container";

// Old links, keeping them here for now. obs, need to import NavLink need to be used!
//<NavLink to="/playerstats">NAV STATS</NavLink><br />
//<NavLink to="/commanders">NAV COMMANDERS</NavLink>


export default function Root() {
    
    return (
        <Container fluid className="RootContainer">
            <Outlet />
            <Navigation />
        </Container>
    ) 
} 



