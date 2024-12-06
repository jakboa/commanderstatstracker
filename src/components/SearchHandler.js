

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

    getAllPlayers: () => {
        let allPlayers = gameInfo.map(match =>  
            match.players.map( player => 
                player.nickName)
            ).flat();
        allPlayers = [...new Set(allPlayers)]
        
        return allPlayers;
    },

    getAllGroups: () => {
        // Find and store every single Group name.
        let allGroups = {};
        gameInfo.forEach(match => {
            let groupName = match.Group_name;
            if (!allGroups[groupName]){
                return  allGroups[groupName] = [ match.players.map(players => players.nickName) ]
            };
        });
        // Use Set to remove all the duplicates.
        //allGroups = [...new Set(allGroups)];
        allGroups = Object.entries(allGroups);
        return allGroups;
    }, 

    getOneGroup: (groupToFind) => {
        const groupInfo = gameInfo.filter( match => match.Group_name === groupToFind);
        return groupInfo;
    },

    getSinglePlayerStats: (playerToFind) => {
        const playerInfo = gameInfo.filter( match => match.players.some(player => player.nickName  === playerToFind));
        return playerInfo;
    },
    getSingleCommanderStats: (commanderToFind) => {
        const commanderInfo = gameInfo.filter( match => match.players.some(player => player.commander === commanderToFind));
        return commanderInfo;
    },
    getGroupStats:(group) => {
        const groupStats = {};
        group[0].players.forEach(player => {
            let name = player.nickName;
            return groupStats[name] = {
                "1":0,
                "2":0,
                "3":0,
                "4":0
            }
        });
        group.forEach(match =>  match.players.forEach(player => {
            let name = player.nickName;
            let placement = player.placement.toString();
            
            return groupStats[name][placement] = +1;
        } ))
        return groupStats;
    },

    getPlayerResults: (playerName, playerMatches) => {
        const playerResults = [0,0,0,0];
        playerMatches.forEach(match => {
            match.players.forEach(player => {
                if (player.nickName === playerName) {
                    playerResults[player.placement-1] = +1;
                }
            })
        })
        return playerResults;
    }
}


export default SearchHandler;

//console.log(SearchHandler.getGroupStats(gameInfo));


