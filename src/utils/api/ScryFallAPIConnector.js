
const BASE_URL ="https://api.scryfall.com";


/*
import { useState, useEffect } from "react";

const [cardData, setCardData] = useState([]);
const [loading, setLoading] =useState(true);
const [error, setError] = useState(null);
*/


const ScryFallAPIConnector = {

        fetchRandomCardData: async () => {
            let result = {}
            try {

                const response = await fetch(`${BASE_URL}/cards/random`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status${response.status}`);
                };
                
                result = await response.json();
                /*
                setCardData(result);
                setLoading(false);
                */

            } catch (error) {
                console.log(error);
                /* 
                setError("An error occured fetching data from api, try again later :(");
                setLoading(false);
                */
            }

            //console.log(result.name)
            return result
        },
        getSingleCommanderData: async (commanderName) => {
            let result = {}
            let searchCommanderName = commanderName.replace(" ","+")
            try {
                const response = await fetch(`${BASE_URL}/cards/named?fuzzy=${searchCommanderName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status${response.status}`);
                };                
                result = await response.json();

            } catch (error) {
                console.log(error);
                return error;
            }
            console.log(result);
            return result
        },
        getGroupCommanderData: async (commanderList) => {
            let result ={}

            // The format for commanderList NEEDS to be: [ {name:"PreciseCardName"}, {name:"PreciseCardName"} ]

            try {
                const response = await fetch(`${BASE_URL}/cards/collection`,{
                    method: "POST",
                    body: JSON.stringify({"identifiers":commanderList}),
                    headers: {
                        "Accept": "*/*",
                        "Content-Type": "application/json"
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };                
                result = await response.json();

            } catch (error) {
                console.log(error);
            }
            console.log(result);
            return result
        },
        getAutoCompleteCommander: async (searchWord) => {
            let result = {};

            try {
                const response = await fetch(`${BASE_URL}/cards/autocomplete?q=${searchWord}`);

                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };
                result = await response.json();

            } catch (error) {
                console.log(error);
            }
            console.log(result);
            return result.data;
            
        }

};



export default ScryFallAPIConnector;