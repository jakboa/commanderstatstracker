
import { gameInfo } from "../MockData"



const allCommanders = Array.from(new Set(gameInfo.map(
    match => match.players.map(
        playedCommander => playedCommander.commander
    )).flat()));




// Use new Set to remove duplicates and Array.from
// to make it into a Array again. Big O should be 
// around O(n*m) so it is fine for now, but will look into this later!
// OBS: CHECK FLATMAP perhaps?
const allPlayers = Array.from(new Set(gameInfo.map(
    match => match.players.map(
        player => player.nickName
    )).flat()));    


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

    findPlayer: (playerToFind) => {
        const playerInfo = allPlayers.filter(player => player.toLowerCase().includes(playerToFind.toLowerCase()));
        return playerInfo;
        
    },

    findGroup: (groupToFind, groups) => {

        const filterGroup = groups.filter(group => group[0].toLowerCase().includes(groupToFind.toLowerCase()));
        return filterGroup;
        
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
        // Make a object with placements as keys for each player in the group
        group[0].players.forEach(player => {
            let name = player.nickName;
            return groupStats[name] = {
                "1":0,
                "2":0,
                "3":0,
                "4":0
            }
        });
        // Itterate over the games and add placements to groupStats.
        group.forEach(match =>  match.players.forEach(player => {
            let name = player.nickName;
            let placement = player.placement.toString();
            return groupStats[name][placement] = groupStats[name][placement] +1;
        } ))
        return groupStats;
    },

    getEntityResults: (entityName, playerMatches) => {
        const entityResults = [0,0,0,0];
        playerMatches.forEach(match => {
            match.players.forEach(player => {
                if (player.nickName === entityName || player.commander === entityName) {
                    entityResults[player.placement-1] = entityResults[player.placement-1] + 1;
                }
            })
        })
        return entityResults;
    },

    getGroupInfo: (group) => {
        const setPlayerNicks = new Set();
        const mostUsedCommanders = {};
        //const bestCommander = {};
        group.forEach(match => {
            match.players.forEach(player => {
                setPlayerNicks.add(player.nickName);
                let commander = player.commander;
                if (mostUsedCommanders[commander]){
                    mostUsedCommanders[commander] = mostUsedCommanders[commander] +1;
                } else {mostUsedCommanders[commander] = 1;}
                
            })
        });
        const arrayPlayerNicks = [...setPlayerNicks];

        return {arrayPlayerNicks, mostUsedCommanders};
    }, 

    getEntityMatchesForYear: (matches, year) =>{
        if (year === "allMatches") {
            return matches;
        };
        const yearGames = matches.filter((match) => match.year.toString() === year.toString());
        return yearGames;
    },

    getLineChartData: (entityName, matches) =>{
        const entityResults = matches.map(match => {
            const player = match.players.find(player => player.nickName === entityName || player.commander === entityName);
            return player.placement;
            }
        )
        return entityResults;
    },
    getGroupLineChartData:(group) => {
        const groupStatsLineData = {};
        
        // Make a object with placements as keys for each player in the group
        group[0].players.forEach(player => {
            let name = player.nickName;
            return groupStatsLineData[name] = []
        });

        // Itterate over the games and add placements to groupStatsLineData.
        group.forEach(match =>  match.players.forEach(player => {
            let name = player.nickName;
            let placement = player.placement;
            return groupStatsLineData[name].push(placement);
        } ));

        const groupStatsLineDataArray = Object.entries(groupStatsLineData).map(([key, value]) => ({
            player:key,
            results:value
        }))
        groupStatsLineDataArray.sort((a, b) => a.player.localeCompare(b.player));
        return groupStatsLineDataArray;
    },

    getYears:(matches) => {
        const years = Array.from(new Set(matches.map(
            match => match.year
            )));
        return years; 
    },
    getEntityCardInfo: () =>{
        const entityResults = {};
        gameInfo.forEach(match=> {
            match.players.forEach(player => {

                // Create a new key, value pair if not in object.
                if (!entityResults[player.nickName]) {
                    entityResults[player.nickName] = { first:0, games:0}
                } 

                if (!entityResults[player.commander]) {
                    entityResults[player.commander] = { first:0, games:0}
                } 

                // If entity has won, increment by 1.
                if (player.placement === 1) {
                    entityResults[player.nickName].first += 1;
                    entityResults[player.commander].first += 1;
                }
                // Finaly increment the times the entity has played in a match.
                entityResults[player.nickName].games += 1;
                entityResults[player.commander].games += 1;
            })
        })
        return entityResults;
    },

    getCommanderCardsByPlayer: (allMatches, findPlayer) => {
        const commanderResults = {};
        let id = 0;
        allMatches.forEach(match => {
            const player = match.players.find(player => player.nickName === findPlayer);
            if (!commanderResults[player.commander]) {
                commanderResults[player.commander] = { first:0, games:0, id:id};
                id ++;
            }
            
            if (player.placement === 1){
                    commanderResults[player.commander].first += 1;
                };

            commanderResults[player.commander].games += 1;
        });
        const arrayCommanderResults = Object.entries(commanderResults);
        return arrayCommanderResults;
    }

}

export default SearchHandler;



//console.log(SearchHandler.getEntityCardInfo());



