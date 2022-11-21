//TODO: Move to ENV file
const baseSearchURL = 'http://localhost:8000/api/document-data-api/search?';

function SearchURLBuilder(searchOptions) {
    let search = baseSearchURL

    search += 'words=' + searchOptions.searchText.replace(/ /g, ',');

    if(searchOptions.sources !== undefined) {
        let idArray = [];

        for (let i = 0; i < searchOptions.sources.length; i++) {
            idArray[i] = searchOptions.sources[i].id;
        }

        let options = idArray.join(',');
        search += '&sourceId=' + options;
    }

    if(searchOptions.authors !== undefined) {
        let idArray = [];

        for (let i = 0; i < searchOptions.authors.length; i++) {
            idArray[i] = searchOptions.authors[i].id;
        }

        let options = idArray.join(',');
        search += '&author=' + options;
    }

    if(searchOptions.categories !== undefined) {
        let idArray = [];

        for (let i = 0; i < searchOptions.categories.length; i++) {
            idArray[i] = searchOptions.categories[i].id;
        }

        let options = idArray.join(',');
        search += '&categoryId=' + options;
    }

    if(searchOptions.beforeDate !== undefined) {
        search += '&beforeDate=' + encodeURIComponent(searchOptions.beforeDate);
    }

    if(searchOptions.afterDate !== undefined) {
        search += '&afterDate=' + encodeURIComponent(searchOptions.afterDate);
    }

    return search;
}

export function GetSearchResults(searchOptions, setSearching, setFirstSearchMade) {
    let searchURL = SearchURLBuilder(searchOptions);

    let result =  fetch(searchURL)
                        .then(response => response.json())
                        .catch(() => { return []; });
    
    setSearching(false);
    setFirstSearchMade(true);

    return result;
}

export default GetSearchResults;
