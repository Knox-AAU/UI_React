import React from 'react'
import '../Css/SearchResult.css';

function SearchResult({searchResult}) {
    const {title, id, score} = searchResult
    return (
            <div className="searchResultDiv">
                <h2 ><a href= {"http://localhost:8081/api/getpdf?id="+id} target="_blank" rel="noreferrer">{title}</a></h2>
                <small id="scoreField" class="text-muted">score: {score}</small>
            </div>
            )
}

//SearchResult.propTypes

export default SearchResult
