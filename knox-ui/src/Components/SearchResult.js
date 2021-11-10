import React from 'react'

const searchResultStyle = {
    color: "royalblue",
    marginLeft: "10vh"
};

function SearchResult(searchResult) {
    const {title, id, score} = searchResult.searchResult //TODO FIGURE OUT WHY SEARCH RESULT IS WRAPPED IN SEARCH RESULT
    return (
            <div className="search-result">
                <h1 style={searchResultStyle}><a href= {"http://localhost:8081/api/getpdf?id="+id} target="_blank">{title}</a></h1>
                <p style={searchResultStyle}>score: {score}</p>
            </div>
            )
}

//SearchResult.propTypes

export default SearchResult
