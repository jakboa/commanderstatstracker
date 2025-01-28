import React from "react";
import SearchHandler from "./SearchHandler";



import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function YearSelector( { yearChoice,  matches, handleFilterMatches } ) {


    let activeButtons = null;

    if (yearChoice) {

        activeButtons = SearchHandler.getYears(matches);
    };

    // This is hardcoded now, I will change this when the structure is more clearer.
    const yearDisplay = ["2021","2022","2023","2024","2025"];

    return(
        <>
            {yearChoice ? (
                
                <Tabs 
                defaultActiveKey="allMatches"
                onSelect={(e)=>{handleFilterMatches(e)}}
                id="YearResults">

                    <Tab eventKey="allMatches" title="All Results" className="border"></Tab>
                
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
            ) : (
                <></>
                ) 
            }
        <ButtonGroup aria-label="Basic example">
            <Button >All Results</Button>
            <Button >2021</Button>
            <Button variant="secondary" disabled>2022</Button>
            <Button >2023</Button>
            <Button variant="secondary" disabled>2024</Button>
            <Button variant="secondary" disabled>2025</Button>
        </ButtonGroup>
        </>        
        );
    
};