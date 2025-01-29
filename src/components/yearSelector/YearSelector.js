import React from "react";
import SearchHandler from "../SearchHandler";
import YearButton from "./YearButton";

import "./YearSelector.css";



import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function YearSelector( { yearChoice,  matches, buttonsActive, toggleYearsUpdate, handleAllYears  } ) {

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
                        <ButtonGroup >
                        <Button onClick={ handleAllYears } className={ buttonsActive.every(button => button === false) ? "buttonActive" : "buttonDeactive"} >All Years</Button>
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