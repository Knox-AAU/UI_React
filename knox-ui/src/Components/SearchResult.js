import React from 'react'

const searchResultStyle = {
    color: "royalblue",
    marginLeft: "10vh"
};
const onClick =(id)=>{
    fetch("http://localhost:8081/api/getpdf?id="+id)
    .then(response => response.body)
    .then(body => {
    })
}
function SearchResult(searchResult) {
    const {title, id, score} = searchResult.searchResult //TODO FIGURE OUT WHY SEARCH RESULT IS WRAPPED IN SEARCH RESULT
    return (
            <div className="search-result">
                <h1 style={searchResultStyle}><a href= {"http://localhost:8081/api/getpdf?id="+id} target="_blank">{title}</a></h1>
                <p style={searchResultStyle}>score: {score}</p>
                {/* <button onClick={onClick(id)}>test</button> */}
            </div>
            )
}

//SearchResult.propTypes

export default SearchResult
