import React from 'react'
import Document from "../../Models/DocumentModel";
import '../../Css/SearchResult.css';

function SearchResult({searchResult}) {
    const document = new Document(searchResult.documentModel.id,
                                  searchResult.documentModel.sourceId,
                                  searchResult.documentModel.categoryId,
                                  searchResult.documentModel.publication,
                                  searchResult.documentModel.title,
                                  searchResult.documentModel.author
    );
    const relevance = searchResult.relevance;

    return (
            <div className="searchResultDiv">
                <h2>{document.title}</h2>
                <small id="scoreField" className="text-muted">Relevance: {Number(relevance).toFixed(2)}</small>
            </div>
            )
}

export default SearchResult
