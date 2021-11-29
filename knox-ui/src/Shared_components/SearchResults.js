import React from 'react'
import propTypes from 'prop-types'
import SearchResult from './SearchResult'
import '../Css/SearchResults.css';

function SearchResults({ searchResults, firstSearchMade }) {
    return (
        <ul className="list-group list-group-flush">
            {searchResults.length === 0 && firstSearchMade
                ? <li className="list-group-item">No results</li>
                : searchResults.map(result => {
                    return (
                        <li className="list-group-item">
                            <SearchResult searchResult={result} />
                        </li>
                    )
                })}
        </ul>
    )
}
SearchResults.propTypes = {
    searchResult: propTypes.arrayOf(propTypes.object)
}

export default SearchResults
