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

export default SearchOptions;
