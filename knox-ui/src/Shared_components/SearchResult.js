import React from 'react'
import '../Css/SearchResult.css';

function SearchResult({searchResult}) {
    const {title, id, score} = searchResult
    return (
            <div className="searchResultDiv">
                <h2 ><a href= {"http://localhost:8000/getpdf?id="+id} target="_blank" rel="noopener noreferrer">{title}</a></h2>
                <small id="scoreField" class="text-muted">score: {Number(score).toFixed(2)}</small>
            </div>
            )
}

export default SearchResult
