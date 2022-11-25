const authorsEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/authors';

export async function GetAuthors() {
    try {
        let response = await fetch(authorsEndpoint, {
            headers: {
                origin: "localhost"
            }
        });
        let json = await response.json();
        if (response.ok) {
            return json;
        }
        else {
            let details = "";
            for (const [key, value] of Object.entries(json.errors)) {
                console.log(value);
                details += key + ": " + value.join(' ');
            }
            console.warn("Unable to fetch authors: " + response.statusText + " (" + details + ")");
            return [];
        }
    }
    catch (e) {
        console.error('An error occurred while fetching authors: ' + e);
        return [];
    }
}

export default GetAuthors;
