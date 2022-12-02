const sourcesEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/sources';

export function GetSources() {
    return fetch(sourcesEndpoint, { headers: { origin: "localhost" } })
        .then(response => response?.ok ? response.json() : [])
        .catch(console.error);
}

export default GetSources;
