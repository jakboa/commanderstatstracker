import React from "react";




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
            <Button disabled className="fw-light fs-6">No data</Button>
        )
    }
    

}

//[toggle,"All Results"]