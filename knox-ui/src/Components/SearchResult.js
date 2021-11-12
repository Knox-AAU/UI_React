import React from 'react'

function SearchResult(searchResult) {
    const {title, id, score} = searchResult.searchResult //TODO FIGURE OUT WHY SEARCH RESULT IS WRAPPED IN SEARCH RESULT
    return (
            <div className="search-result SearchResultStyle">
                <h1 ><a href= {"http://localhost:8081/api/getpdf?id="+id} target="_blank" rel="noreferrer">{title}</a></h1>
                <p >score: {score}</p>
            </div>
            )
}

//SearchResult.propTypes

export default SearchResult
