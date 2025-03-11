
const BASE_URL = "https://cstkotlin.azurewebsites.net/api";



const DatabaseAPIConnector = {

    testConnection: async() => {
        let result = "";

        try {

            const response = await fetch(`${BASE_URL}/hello`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            result = response.body;

        } catch(error) {
            console.log(error)
        }

        return result;
    }

};


export default DatabaseAPIConnector;

