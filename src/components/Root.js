import React from "react";
import './Root.css';
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./header/Header";

import Container  from "react-bootstrap/Container";
import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";

// Old links, keeping them here for now. obs, need to import NavLink need to be used!
//<NavLink to="/playerstats">NAV STATS</NavLink><br />
//<NavLink to="/commanders">NAV COMMANDERS</NavLink>


export default function Root() {
    
    return (
        <Container fluid className="RootContainer">
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Outlet />
            <Footer />
        </Container>
    ) 
} 



