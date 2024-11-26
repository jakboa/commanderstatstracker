

import { gameInfo } from "../MockData"

const allCommanders = gameInfo.map(
    match => match.players.map(
        playedCommander => playedCommander.commander
    )).flat();



const SearchHandler = {

    findCommander: (search) => {
        // .filter returns cares about boolean values
        // and .includes returns false if the do not match!
        // +1 in synergy!
        const filterCommanders = allCommanders.filter( commander => 
            commander.toLowerCase().includes(search.toLowerCase()) 
        )
        return filterCommanders;
    },

    getAllCommanders: () => {
        return allCommanders;
    },

    getAllGroups: () => {
        // Find and store every single Group name.
        let allGroups = gameInfo.map(match => match.Group_name);
        // Use Set to remove all the duplicates.
        allGroups = [...new Set(allGroups)];
        return allGroups;
    }, 

    getAllPlayers: () => {
        let allPlayers = gameInfo.map(match =>  
            match.players.map( player => 
                player.nickName)
            ).flat();
        allPlayers = [...new Set(allPlayers)]
        
        return allPlayers;
    }


}

//console.log(SearchHandler.getAllPlayers());


export default SearchHandler;




