import React from 'react'
import '../Css/SearchResult.css';



function SearchResult({searchResult}) {
    const {id, passages} = searchResult
    return (
        <div className="searchResultDiv">
        <h2 ><a href= {"http://localhost:8000/getpdf?id=" + id} target="_blank" rel="noreferrer">{id}</a></h2>
        <small id="scoreField" class="text-muted">
            {
            passages.map(result => {
                return (
                    <div className="passageResultDiv">
                        <p className='text-wrap'>{result.fullPassage}</p>
                        <p>Final score: {result.score}</p>
                        <div>Sub scores:</div>
                        {
                            Object.entries(result.keyValuePairs).map((key) => {
                                return (
                                        <p class="mx-5">{key[0]}: {key[1]}</p>
                                    )
                            }
                            )
                            }
                    </div>
                )
            })
            }
        </small>
    </div>
            )
}

export default SearchResult
