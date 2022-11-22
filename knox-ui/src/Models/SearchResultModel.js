export class SearchResult {
    document;
    relevance;

    constructor(document, relevance) {
        this.document = document;
        this.relevance = relevance;
    }
}

export default SearchResult;