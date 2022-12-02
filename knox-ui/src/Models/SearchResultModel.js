export class SearchResult {
    documentModel;
    relevance;

    constructor(documentModel, relevance) {
        this.documentModel = documentModel;
        this.relevance = relevance;
    }
}

export default SearchResult;