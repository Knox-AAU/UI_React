import Source from '../Models/SourceModel';

const sourcesEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/sources';

export async function GetSources() {
    const response = await fetch(sourcesEndpoint, {
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
            details += key + ": " + value.join(' ');
        }
        console.error("Unable to fetch sources: " + response.statusText + " (" + details + ")");
        return [];
    }
}

export default GetSources;
