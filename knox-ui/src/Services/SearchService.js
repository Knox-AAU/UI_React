import GetSources from "./SourcesService";

const baseSearchURL = 'http://knox-master01.srv.aau.dk/accessapi/api/document-data-api/search?';

function SearchURLBuilder(searchOptions) {
    let search = baseSearchURL

    search += 'words=' + searchOptions.searchText.replace(/ /g, ',');

    if(searchOptions.sources === undefined) {
        searchOptions.sources = GetSources();
    }

    let sourcesArray = [];

    for (let i = 0; i < searchOptions.sources.length; i++) {
        sourcesArray[i] = searchOptions.sources[i].id;
    }

    let sourcesOptions = sourcesArray.join(',');
    search += '&sourceIds=' + sourcesOptions;

    if(searchOptions.authors !== undefined) {
        let idArray = [];

        for (let i = 0; i < searchOptions.authors.length; i++) {
            idArray[i] = searchOptions.authors[i].id;
        }

        let options = idArray.join(',');
        search += '&authors=' + options;
    }

    if(searchOptions.categories !== undefined) {
        let idArray = [];

        for (let i = 0; i < searchOptions.categories.length; i++) {
            idArray[i] = searchOptions.categories[i].id;
        }

        let options = idArray.join(',');
        search += '&categoryIds=' + options;
    }

    if(searchOptions.beforeDate !== undefined) {
        search += '&beforeDate=' + encodeURIComponent(searchOptions.beforeDate);
    }

    if(searchOptions.afterDate !== undefined) {
        search += '&afterDate=' + encodeURIComponent(searchOptions.afterDate);
    }

    console.log('URL: ' + search);
    return search;
}

export function GetSearchResults(searchOptions, setSearching, setFirstSearchMade) {
    let searchURL = SearchURLBuilder(searchOptions);

    let result = fetch(searchURL)
                        .then(response => response.json())
                        .catch(() => { return []; });
    
    setSearching(false);
    setFirstSearchMade(true);

    return result;
}

export default GetSearchResults;
