import React from "react";
import SearchHandler from "./SearchHandler";



import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


export default function YearSelector( { matches, handleFilterMatches } ) {


    const activeButtons = SearchHandler.getYears(matches);

    // This is hardcoded now, I will change this when the structure is more clearer.
    const yearDisplay = ["2021","2022","2023","2024","2025"];

    return(
        <Tabs 
            defaultActiveKey="allMatches"
            onSelect={(e)=>{handleFilterMatches(e)}}
            id="YearResults">

            <Tab eventKey="allMatches" title="All Results"></Tab>
            
            {yearDisplay.map((yearButton, index) => {
                if(activeButtons.includes(yearButton)) {
                    return <Tab eventKey={yearButton} title={yearButton} key={index}></Tab>
                } else {
                    return (
                        <Tab eventKey={yearButton} title={yearButton} key={index} disabled></Tab>
                    )
                }
            })}
        </Tabs>
    );
};