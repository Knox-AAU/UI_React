const categoriesEndpoint = process.env.REACT_APP_ACCESS_API + '/document-data/categories';

export async function GetCategories() {
    const response = await fetch(categoriesEndpoint, {
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
        console.error("Unable to fetch categories: " + response.statusText + " (" + details + ")");
        return [];
    }
}

export default GetCategories;
