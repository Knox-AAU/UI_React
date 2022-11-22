import React from 'react'
import Document from "../Models/DocumentModel";
import '../Css/SearchResult.css';

function SearchResult({searchResult}) {
    const document = new Document(searchResult.document.id,
                                  searchResult.document.sourceId,
                                  searchResult.document.categoryId,
                                  searchResult.document.publication,
                                  searchResult.document.title,
                                  searchResult.document.author
    );
    const relevance = searchResult.relevance;

    return (
            <div className="searchResultDiv">
                <h2 ><a href= {"http://localhost:8000/getpdf?id=" + document.id} target="_blank" rel="noopener noreferrer">{document.title}</a></h2>
                <small id="scoreField" className="text-muted">score: {Number(relevance).toFixed(2)}</small>
            </div>
            )
}

export default SearchResult
