import React, {useState, useEffect} from "react";
//import { useSearchParams } from "react-router-dom";

import SearchHandler from "./SearchHandler";


export default function Commanders() {
    
    //const [searchParams, setSearchParams] = useSearchParams();
    const [commanderSearch, setCommanderSearch] = useState("");
    const [commandersFound, setCommandersFound] = useState(SearchHandler.getAllCommanders)



    // Update the 
    const findCommanderHandler = (event) => {
        setCommanderSearch(event.target.value);
    }
    // Needs to use useEffect in order for it to update, otherwise
    // it will always be one render behind!
    useEffect(()=>{
        setCommandersFound(SearchHandler.findCommander(commanderSearch));
    },[commanderSearch]);


    if (!commanderSearch) {
        return(
            <div>
                <h1>Commanders</h1>
                <p>Here be commanders!</p>
                <input type="text" placeholder="Search for commander here!" onChange={findCommanderHandler}></input>
    
                <p>Here are all the commanders</p>
                {commandersFound.map(commander=>{
                    return (
                            <p>{commander}</p>
                    )
                })}
            </div>
        );
    }

    return(
        <div>
            <h1>Commanders</h1>
            <p>Here be commanders!</p>
            <input type="text" placeholder="Search for commander here!" onChange={findCommanderHandler}></input>
            
            <p>Here are the commanders that fit the search so far:</p>
                {commandersFound.map(commander=>{
                    return (
                            <p>{commander}</p>
                    )
                })}
        </div>
    );
};