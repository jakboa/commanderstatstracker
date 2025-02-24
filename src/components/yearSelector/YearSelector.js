import React from "react";
import SearchHandler from "../SearchHandler";
import YearButton from "./YearButton";

import "./YearSelector.css";



import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


export default function YearSelector( { toggleYear, toggleFilter, yearChoice,  matches, buttonsActive, toggleYearsUpdate, handleAllYears  } ) {

    const yearDisplay = ["2021","2022","2023","2024","2025"];
    // if there is no data for that year, find out, 
    // also if the page does not require filtering, do not filter.
    let activeButtons = null;
    if (yearChoice) {
        activeButtons = SearchHandler.getYears(matches);
    };

    return(
        <>
            {yearChoice ? (
                    <div>
                        <h4 className="pe-2 d-inline-flex">Filter:</h4>
                        <ButtonGroup className="my-2">
                        <Button onClick={ handleAllYears } className={ buttonsActive.every(button => button === false) ? "bg-success border-success" : "bg-danger border-danger"} >All Years</Button>
                        {yearDisplay.map((year, index) => {
                            return (
                                <YearButton 
                                    key={index} 
                                    buttonNr={index} 
                                    toggleYearsUpdate={ toggleYearsUpdate } 
                                    year={ year } 
                                    activeButtons = { activeButtons }
                                    isActive = { buttonsActive[index] } />
                                )
                            }
                            
                            )}
                        </ButtonGroup>
                        
                        <ToggleButton 
                            className={`ms-2 ${toggleYear ? "bg-success border-success" : "bg-danger border-danger"}`} 
                            onClick={ toggleFilter }>
                            Toggle Year
                        </ToggleButton>
                    </div>
            ) : (
                <></>
                ) 
            }

        </>        
        );
};


/* 
    OLD CODE, I AM KEEPING IT INCASE I WANT TO USE TABS AGAIN.
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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


*/