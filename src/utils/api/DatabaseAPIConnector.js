
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
            const test = JSON.stringify(matchData)
            console.log(test)
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
    },

    getMatches: async(filters) => {
        let result = {};
        console.log(filters)

        try {
            const getMatchesRequest = JSON.stringify(filters);
            console.log(getMatchesRequest);
            const response = await fetch(`${BASE_URL}/getMatch?filter=${filters.filter}&searchFor=${filters.searchFor}`);
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error! Status: ${response.status}, Reason: ${errorText}`);
            };

            result = await response.json();

        } catch(error) {
            console.log(error)
        };


        return result;

    }
};
export default DatabaseAPIConnector;

