const authorsEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/authors';

export function GetAuthors() {
    return fetch(authorsEndpoint, { headers: { origin: "localhost" } })
        .then(response => response?.ok ? response.json() : [])
        .catch(console.error);
}

export default GetAuthors;
