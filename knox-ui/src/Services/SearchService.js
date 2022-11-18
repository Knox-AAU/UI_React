//TODO: Move to ENV file
const searchURL = 'http://localhost:8000/api/document-data-api/search?';

export class SearchOptions {
    searchText;
    sources;
    authors;
    categories;
    beforeDate;
    afterDate;

    constructor(searchText, sources, authors, categories, beforeDate, afterDate) {
        this.searchText = searchText;
        this.sources = sources;
        this.authors = authors;
        this.categories = categories;
        this.beforeDate = beforeDate;
        this.afterDate = afterDate;
    }
}


export function SearchURLBuilder(searchOptions) {
    let search = searchURL

    search += 'words=' + searchOptions.searchText.replace(' ', ',');
    
    if(searchOptions.sources !== undefined) {
        let options = searchOptions.sources.join(',');
        search += '&sourceId=' + options;
    }

    if(searchOptions.authors !== undefined) {
        let options = searchOptions.authors.join(',');
        search += '&author=' + options;
    }

    if(searchOptions.categories !== undefined) {
        let options = searchOptions.categories.join(',');
        search += '&categoryId=' + options;
    }

    if(searchOptions.beforeDate !== undefined) {
        search += '&beforeDate=' + searchOptions.beforeDate;
    }

    if(searchOptions.afterDate !== undefined) {
        search += '&afterDate=' + searchOptions.afterDate;
    }

    return search;
}

export function GetSearchResults(searchURL, setSearching, setFirstSearchMade) {
    let result =  fetch(searchURL)
                        .then(response => response.json())
                        .catch(e => {
                            console.warn(e);
                            return [];
                        });
    
    setSearching(false);
    setFirstSearchMade(true);

    return result;
}

export default GetSearchResults;
