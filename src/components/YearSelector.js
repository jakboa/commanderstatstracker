import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


export default function YearSelector( { years, handleFilterMatches } ) {

    return(
        <Tabs 
            defaultActiveKey="allMatches"
            onSelect={(e)=>{handleFilterMatches(e)}}
            id="YearResults"
            className="mb-3">

            <Tab eventKey="allMatches" title="All Results"></Tab>
            <Tab eventKey="2021" title="2021"></Tab>
            <Tab eventKey="2022" title="2022"></Tab>
        </Tabs>
    );
};