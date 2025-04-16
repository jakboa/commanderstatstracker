
const BASE_URL = "https://cstkotlin.azurewebsites.net/api";



const DatabaseAPIConnector = {

    testConnection: async(playerName) => {
        let result = "";

        try {

            const response = await fetch(`${BASE_URL}/hello?name=${playerName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            result = response.text();

        } catch(error) {
            console.log(error)
        }

        return result;
    },

    addMatch: async(matchData) => {
        let result = "";

        try {
            const response = await fetch(`${BASE_URL}/addMatch`,{
                method: "POST",
                body: JSON.stringify(matchData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            result = response.text();

        } catch(error) {
            console.log(error)
        }

        return result;
    }

};


export default DatabaseAPIConnector;

