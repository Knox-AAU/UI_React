const categoriesEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/categories';

export function GetCategories() {
    return fetch(categoriesEndpoint, { headers: { origin: "localhost" } })
        .then(response => response?.ok ? response.json() : [])
        .catch(console.error);
}

export default GetCategories;
