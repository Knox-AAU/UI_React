import React from 'react'
import { useState, useEffect } from 'react';
import '../../Css/PaginatedSearchResults.css';
import {Paper, Card, List, ListItem, Pagination } from "@mui/material";

function PaginatedSearchResults({ itemsPerPage, searchResults }) {
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
    const handleChangePage = (page) => {
        console.log(page);
        setItemOffset((page * itemsPerPage) % searchResults.length);
        window.scrollTo(0,0);
    }

    const getNormalizedRelevance = (relevance) => {
        return relevanceSum > 0
            ? (relevance / relevanceSum) * 100
            : 0;
    }

    return (
        <div className="PaginateStyle">
            <Paper style={{maxHeight: 450, overflow: 'auto'}} sx={{boxShadow: 0}}>
                <List>
                    {currentSearchResults?.map(x => (
                        <ListItem key={x.documentModel.id} variant="outlined" sx={{padding: 0, margin: 0}}>
                            <Card sx={{width: '100%', paddingTop: 1, paddingLeft: 1, boxShadow: 0}}>
                                <h4 className='title-link'
                                    onClick={() => console.log('Not implemented yet')}>{x.documentModel.title}
                                </h4>
                                <p className={"text-muted"}>Written by {x.documentModel.author}, published on {x.documentModel.date.toLocaleDateString()} in {x.documentModel.publication} from {x.sourceName}</p>
                                <p className={"text-muted"}>Relevance: {getNormalizedRelevance(x.relevance).toFixed(0)}%</p>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Pagination
                shape='rounded'
                variant='outlined'
                sx={{
                    marginTop: 2
                }}
                count={pageCount}
                onChange={(event, page) => handleChangePage(page)}
                showFirstButton
                showLastButton
            />
        </div>
    );
}

export default PaginatedSearchResults
