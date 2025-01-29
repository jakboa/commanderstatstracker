import React, { useState } from "react";




import Button from 'react-bootstrap/Button';



export default function YearButton( { buttonNr, toggleYearsUpdate, year, activeButtons, isActive  } ) {

    if (activeButtons?.includes(year)) {
        return (
            <Button value={year} 
                onClick={() =>toggleYearsUpdate(buttonNr,year)} 
                className={isActive ? "buttonActive" : "buttonDeactive"} 
                >{year}</Button>
        )
    } else {
        return (
            <Button disabled>No data</Button>
        )
    }
    

}

//[toggle,"All Results"]