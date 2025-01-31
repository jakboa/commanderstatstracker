
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

        const entityMatchResults = { "allMatches":{ 1:0, 2:0, 3:0, 4:0, "games":0 , },"groups": new Set(),"players": new Set() };
        playerMatches.forEach(match => {
            match.players.forEach(player => {
                // Iterate over players and find the commander or player we are looking for.
                if (player.nickName === entityName || player.commander === entityName) {
                    
                    // First time finding a year, create it.
                    if (!entityMatchResults[match.year]) {
                        entityMatchResults[match.year] = { 1:0, 2:0, 3:0, 4:0, games:0 };
                    }

                    // Iterate over placement and year
                    entityMatchResults[match.year][player.placement] ++;
                    entityMatchResults[match.year]["games"] ++;
                    entityMatchResults["allMatches"][player.placement] ++
                    entityMatchResults["allMatches"]["games"] ++
                    entityMatchResults["groups"].add(match.Group_name);
                    entityMatchResults["players"].add(player.nickName);
                }
            })
        })

        // After using set to filter duplicates we make it an array for easier use in the frontend.
        entityMatchResults["groups"] = Array.from(entityMatchResults["groups"]);
        entityMatchResults["players"] = Array.from(entityMatchResults["players"])

        return entityMatchResults;

        /*  Old code I keep for now?

        const entityResults = [0,0,0,0];
        playerMatches.forEach(match => {
            match.players.forEach(player => {
                if (player.nickName === entityName || player.commander === entityName) {
                    entityResults[player.placement-1] = entityResults[player.placement-1] + 1;
                }
            })
        })
        return entityResults;
        */
    },

    getGroupInfo: (group) => {
        const setPlayerNicks = new Set();
        const mostUsedCommanders = {};
        const playerCommanders = {}
        group.forEach(match => {
            match.players.forEach(player => {
                setPlayerNicks.add(player.nickName);
                let playerNick = player.nickName;
                let commander = player.commander;
                let placement = player.placement;
                if (!mostUsedCommanders[commander]){
                    mostUsedCommanders[commander] ={first:0, played:0};

                };
                if (placement === 1 ){
                    mostUsedCommanders[commander].first++;
                };
                mostUsedCommanders[commander].played++;
                
                if (!playerCommanders[playerNick]) {
                    playerCommanders[playerNick] ={};
                };
                if (!playerCommanders[playerNick][commander]) {
                    playerCommanders[playerNick][commander] = 0;
                };
                playerCommanders[playerNick][commander]++;


            })
        });
        
        const countCommanders = Object.entries(playerCommanders).map(playerCount=> {
            return [playerCount[0],Object.keys(playerCount[1]).length]
        });
        countCommanders.sort((a,b)=>{return b[1]-a[1]})
        const sortedMostUsedCommanders = Object.entries(mostUsedCommanders).sort((a,b)=>{return b[1].first-a[1].first});
        const sortedMostwinsCommander = Object.entries(mostUsedCommanders).sort((a,b)=>{return b[1].first-a[1].first});
        const arrayPlayerNicks = [...setPlayerNicks];

        return {arrayPlayerNicks, sortedMostUsedCommanders, sortedMostwinsCommander, countCommanders};
    }, 

    getEntityMatchesForYear: (matches, year) =>{
        if (year[0] === "allMatches") {
            return matches;
        };
        //const yearGames = matches.filter((match) => match.year.toString() === year.toString());
        const yearGames = matches.filter((match) => year.includes(match.year));
        return yearGames;
    },

    getEntityMatchesForYearAndPlayer: (matches, years, playerToFind, commanderFocus) =>{

        const showAllYears =  years[0] === "allMatches";     
        const showAllPlayers =  playerToFind === "allPlayers";

        const yearAndPlayerGames = matches.filter((match) => {
            const yearFilter = showAllYears || years.some(year => year.toString() === match.year.toString());
            
            const playerFilter = showAllPlayers || match.players.some(
                player=> player.nickName === playerToFind && player.commander === commanderFocus);
            
            return yearFilter && playerFilter
            }
        );
        return yearAndPlayerGames;
        
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
        allMatches.forEach(match => {
            const player = match.players.find(player => player.nickName === findPlayer);
            if (!commanderResults[player.commander]) {
                commanderResults[player.commander] = {"allMatches":{}} 
                commanderResults[player.commander]["allMatches"] = { 1:0, 2:0,3:0, 4:0, games:0}; 
                //commanderResults[player.commander] = { 1:0, 2:0,3:0, 4:0, games:0, yearsPlayed: new Set(["allMatches"])};    
            }
            if (!commanderResults[player.commander][match.year]) {
                commanderResults[player.commander][match.year] = { 1:0, 2:0,3:0, 4:0, games:0}; 
                //commanderResults[player.commander] = { 1:0, 2:0,3:0, 4:0, games:0, yearsPlayed: new Set(["allMatches"])};    
            }


            commanderResults[player.commander][match.year][player.placement] ++;
            commanderResults[player.commander][match.year].games ++;
            commanderResults[player.commander]["allMatches"][player.placement] ++; 
            commanderResults[player.commander]["allMatches"].games ++; 
            

        });
        //const arrayCommanderResults = Object.entries(commanderResults);
        return commanderResults;
    },

    getCommanderFactsForPlayer: (commanderData, cardToFind) => {

        const removeFromTypes = {"Legendary":"Legendary", "Creature":"Creature", "—":"—", "Sorcery":"Sorcery", "//":"//", "Enchantment":"Enchantment"};

        const commanderFacts = []
        commanderData.data.forEach(commander => {
            const cardData = {};

            // Get name & art:
            if (!commander.card_faces) {
                cardData.name = commander.name;
                cardData.image = commander.image_uris.art_crop;
            } else {
                // If double sided card: Find the right side, then extract info.
                const correctCardSide = commander.card_faces.filter(side => cardToFind[side.name]);
                cardData.name = correctCardSide[0].name;
                cardData.image = correctCardSide[0].image_uris.art_crop;
            }

            // Get cmc:
            cardData.cmc = commander.cmc;

            // Get color identity:
            cardData.colorIdentity = commander.color_identity;
            
            // Get creature types:
            let subtypes = [];
            if (commander.type_line.includes("//")){
                subtypes = commander.type_line.split(" ");
                subtypes = subtypes.filter(word => !removeFromTypes[word])
            } else {
                subtypes = commander.type_line.split(" — ")[1].split(" ");
            }
            cardData.types = subtypes;

            // Add match history for the card:
            cardData.matchHistory = cardToFind[cardData.name];
            //cardData.matchHistory = Object.entries(cardData.matchHistory)

            // Add a boolean if the Card is found by Scryfall
            cardData.cardFound = true;

            // Current price in euro
            cardData.price = commander.prices.eur;

            // Add the combined info about the card to the array
            commanderFacts.push(cardData);
        })

        // Take the list of cards without data 
        // and add placeholder info.
        commanderData.not_found.forEach(commander => {
            const cardData = {};
            cardData.name = commander.name;
            cardData.cmc = null;
            cardData.colorIdentity = [];
            cardData.types = [];
            cardData.matchHistory = cardToFind[commander.name];
            cardData.cardFound = false;
            cardData.image = "https://cards.scryfall.io/art_crop/front/0/3/036ef8c9-72ac-46ce-af07-83b79d736538.jpg?1562730661"

            commanderFacts.push(cardData);    
        });
        console.log(commanderFacts)
        return commanderFacts;
    },
    getCardImage: (data, name) => {
        if (data["message"]) {
            return {art: "https://cards.scryfall.io/art_crop/front/0/3/036ef8c9-72ac-46ce-af07-83b79d736538.jpg?1562730661", 
            cardImage: "https://cards.scryfall.io/normal/front/0/3/036ef8c9-72ac-46ce-af07-83b79d736538.jpg?1562730661"} 
        }
        if (!data["image_uris"]) {
            const rightSide = data.card_faces.filter((face) => face.name === name);
            return {art: rightSide[0].image_uris.art_crop, cardImage: rightSide[0].image_uris.normal};
        } else { return {art: data.image_uris.art_crop, cardImage: data.image_uris.normal} }

    },
    getYearButtons: (buttons) => {
        // This is hardcoded for now, I will change this when the structure is more clearer.
        const yearDisplay = ["2021","2022","2023","2024","2025"];
        
        let toggleYears = yearDisplay.filter((__,index) => buttons[index]);

        if (buttons.every(button => button === false))  {
            toggleYears = ["allMatches"];
        };
        
        return toggleYears;
    }

}

export default SearchHandler;



//console.log(SearchHandler.getEntityMatchesForYearAndPlayer(gameInfo,"2021","Token Tyrant"));



