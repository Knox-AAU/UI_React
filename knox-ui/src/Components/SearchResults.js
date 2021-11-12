import React from 'react'
import propTypes from 'prop-types'
import SearchResult from './SearchResult'
import '../Css/SearchResult.css';

function SearchResults({ searchResults, firstSearchMade }) {
    return (
        <ul className="LiStyle">
            {searchResults.length === 0 && firstSearchMade
                ? <li>No results</li>
                : searchResults.map(result => {
                    return (
                        <li>
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
