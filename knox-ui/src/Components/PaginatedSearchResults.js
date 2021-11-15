import React from 'react'
import SearchResults from './SearchResults';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import '../Css/PaginatedSearchResults.css';

function PaginatedSearchResults({ itemsPerPage, searchResults, firstSearchMade }) {
    const [currentSearchResults, setCurrentSearchResults] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Start Location of shown searches
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        setCurrentSearchResults(searchResults.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(searchResults.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, searchResults]);


    // Invoke when user click to request another page.
    const handlePageClick = (event) => setItemOffset((event.selected * itemsPerPage) % searchResults.length)

    return (
        <div className="PaginateStyle">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination' /* as this work same as bootstrap class */
                subContainerClassName='pages pagination' /* as this work same as bootstrap class */
                activeClassName='active' /* as this work same as bootstrap class */
            />
            <SearchResults searchResults={currentSearchResults} firstSearchMade={firstSearchMade} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination' /* as this work same as bootstrap class */
                subContainerClassName='pages pagination' /* as this work same as bootstrap class */
                activeClassName='active' /* as this work same as bootstrap class */
            />
        </div>
    );
}

export default PaginatedSearchResults
