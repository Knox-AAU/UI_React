import React from 'react'
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import '../../Css/PaginatedSearchResults.css';
import {Card, List, ListItem } from "@mui/material";

function PaginatedSearchResults({ itemsPerPage, searchResults, isSearching }) {
    const [currentSearchResults, setCurrentSearchResults] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    // Start Location of shown searches
    const [itemOffset, setItemOffset] = useState(0);
    const [relevanceSum, setRelevanceSum] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        setRelevanceSum(searchResults.map(x => x.relevance).reduce((partialSum, x) => partialSum + x, 0));

        // Pagination is handled by the API through the 'limit' and 'offset' query parameters. The following should probably be redone
        //const endOffset = itemOffset + itemsPerPage;
        setCurrentSearchResults(searchResults/*.slice(itemOffset, endOffset)*/);
        setPageCount(Math.ceil(searchResults?.length / itemsPerPage));
    }, [searchResults, itemsPerPage, itemOffset]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setItemOffset((event.selected * itemsPerPage) % searchResults.length)
        window.scrollTo(0,0)
    }

    const getNormalizedRelevance = (relevance) => {
        return relevanceSum > 0
            ? (relevance / relevanceSum) * 100
            : 0;
    }

    return (
        <div className="PaginateStyle">
            <List>
                {currentSearchResults?.map(x => (
                    <ListItem key={x.documentModel.id} variant="outlined" sx={{padding: 0, margin: 0}}>
                        <Card sx={{width: '100%', padding: 2}}>
                            <h4 className='title-link'
                                onClick={() => console.log('Not implemented yet')}>{x.documentModel.title}</h4>
                            <p className={"text-muted"}>Written by {x.documentModel.author}, published on {x.documentModel.date.toLocaleDateString()} in {x.documentModel.publication} from {x.sourceName}</p>
                            <p className={"text-muted"}>Relevance: {getNormalizedRelevance(x.relevance).toFixed(0)}%</p>
                        </Card>
                    </ListItem>
                ))}
            </List>
            <ReactPaginate
                breakLabel="..."
                nextLabel="→"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="←"
                renderOnZeroPageCount={null}
                containerClassName='pagination' /* as this work same as bootstrap class */
                subContainerClassName='pages pagination' /* as this work same as bootstrap class */
                activeClassName='active' /* as this work same as bootstrap class */
            />
        </div>
    );
}

export default PaginatedSearchResults
