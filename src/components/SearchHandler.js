

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
    }



}


export default SearchHandler;




