import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SearchBar from '../Shared_components/SearchBar';
import PaginatedSearchResults from '../Shared_components/PaginatedSearchResults';
import AdvancedSidebar from '../Shared_components/AdvancedSideBar';
import GetSearchResult from '../Services/SearchService';
import SearchOptions from '../Models/SearchOptionsModel';
import '../Css/HomePage.css';

const Home = () => {
    const useSuggester = false; //Suggester temp dissable
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isFirstSearchMade, setIsFirstSearchMade] = useState(false);
    const [searchOptions, setSearchOptions] = useState(new SearchOptions());

    const onClick = (searchText) => {
        if (isSearching === true) {
            return;
        }

        if (searchText !== undefined || searchText.trim() !== '') {
            setSearchOptions(searchOptions.searchText = searchText);
            setIsSearching(true);
            setSearchResults(
                GetSearchResult(
                    searchOptions,
                    setIsSearching,
                    setIsFirstSearchMade
                )
            );
        } else {
            setSearchResults([]);
            setIsSearching(false);
        }
    };


    return (
        <div className="ContentOfPage">
            <div className="SearchWrapper">
                <div className="SearchBarPlacement">
                    <div className="HeaderDiv">
                        <h1 >Search Contents</h1>
                        <h2 >It is possible to search between multiple datasets of the toolbox!</h2>
                    </div>
                    <div style={{display:'inline-flex',width:"100%",position:'relative'}}>
                    <SearchBar
                        searchText="Enter your search"
                        onClick={onClick}
                        loadingState={isSearching}
                        enableSuggester={useSuggester}
                    />
                    <Button
                        data-testid="advancedButton"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={isOpen}
                        className="ButtonStyle"
                        style={{height:"5vh",width:"100px", padding:"0px"}}
                    >
                        Advanced
                    </Button>
                    </div>
                </div>
                <PaginatedSearchResults
                    itemsPerPage={25}
                    searchResults={searchResults}
                    isFirstSearchMade={isFirstSearchMade}
                />
            </div>
            <AdvancedSidebar
                isOpen={isOpen}
                options={searchOptions}
                setOptions={setSearchOptions}
            />
        </div>
    );
}

export default Home
