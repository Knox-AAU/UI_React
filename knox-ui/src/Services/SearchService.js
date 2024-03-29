import GetSources from "./SourcesService";

const baseSearchURL = process.env.REACT_APP_ACCESS_API + '/search?';

// Expected URL example (decoded): "words=this,is,a,test&sourceIds=1&sourceIds=2&authors=Anders Andersen&authors=Per Petersen&categoryIds=1&categoryIds=2&beforeDate=2010-01-01T10:00:00Z&afterDate=2010-31-12T10:00:00Z"
function SearchURLBuilder(input, sources, authors, categories, beforeDate, afterDate) {
    let search = baseSearchURL
    search += 'words=' + input.replace(/ /g, ',');

    for (const id of sources ?? []) {
        search += '&sourceIds=' + id;
    }
    for (const name of authors ?? []) {
        search += '&authors=' + name;
    }
    for (const category of categories ?? []) {
        search += '&categoryIds=' + category.id;
    }
    if (beforeDate && !isNaN(beforeDate)) {
        search += '&beforeDate=' + beforeDate.toISOString();
    }
    if (afterDate) {
        search += '&afterDate=' + afterDate.toISOString();
    }
    return encodeURI(search);
}

export async function GetSearchResults(input, sources, authors, categories, beforeDate, afterDate) {
    let searchURL = SearchURLBuilder(input, sources, authors, categories, beforeDate, afterDate);
    let allSources = await GetSources();

    return fetch(searchURL, { headers: { origin: "localhost" } })
        .then(response => response?.ok ? response.json() : [])
        .then(results => results.map(result => {
            result.documentModel.date = new Date(result.documentModel.date); // Manually convert string to date
            result.sourceName = allSources.find(source => source.id === result.documentModel.sourceId).name; // get source name from its id
            return result;
        }));
}

export default GetSearchResults;
