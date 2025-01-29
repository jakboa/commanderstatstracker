import React, { useState } from "react";
import SearchHandler from "../SearchHandler";
import YearButton from "./YearButton";

import "./YearSelector.css";



import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


export default function YearSelector( { yearChoice,  matches, handleFilterMatches } ) {

    const [buttonsActive, setButtonsActive] = useState([false,false,false,false,false]);
    let toggleYears = ["allMatches"];


    // This is hardcoded now, I will change this when the structure is more clearer.
    const yearDisplay = ["2021","2022","2023","2024","2025"];

    let activeButtons = null;
    if (yearChoice) {
        activeButtons = SearchHandler.getYears(matches);
    };

    const toggleYearsUpdate = (buttonNr,year) => {
        setButtonsActive(prev => {
            const updatedButtons = [...prev];
            updatedButtons[buttonNr] = !prev[buttonNr];
            return updatedButtons
        });
        if (buttonsActive.every((button) => button === false)) {
            //setToggleYears(prev => prev = ["allMatches"]);
            console.log("YARP");
            toggleYears = ["allMatches"]
        } else {
            handleFilterMatches(year);
            //setToggleYears(prev => prev.includes(year) || prev.includes("allMatches") ? prev.filter(remove => remove !== year) :  [...prev, year]);
            console.log(toggleYears.includes(year) || toggleYears.includes("allMatches"));
            toggleYears = toggleYears.includes(year) || toggleYears.includes("allMatches") ? toggleYears.filter(remove => remove !== year) :  [...toggleYears, year];
        }


    }

    console.log(toggleYears);

    return(
        <>
            {yearChoice ? (
                        <ButtonGroup >
                        <Button value={"All Results"} >All Years</Button>
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