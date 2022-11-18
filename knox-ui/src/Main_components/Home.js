import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import SearchBar from '../Shared_components/SearchBar';
import PaginatedSearchResults from '../Shared_components/PaginatedSearchResults';
import AdvancedSidebar from '../Shared_components/AdvancedSideBar';
import GetSearchResult from '../Services/SearchService';
import SearchOptions from '../Models/SearchOptionsModel';
import '../Css/HomePage.css';

//Completed
//TODO: Need to use SearchOptions (instead of advancedOptions)
//TODO: Save sidebar settings in SearchOptions
//TODO: Change to use SearchService (instead of using fetch in Home)

//Incomplete
//TODO: Add ratelimiting on services (might help: https://stackoverflow.com/questions/33946228/rate-limit-a-javascript-function)
//TODO: Add env file to project (npm install dotenv --save) (https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project)

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isFirstSearchMade, setIsFirstSearchMade] = useState(false);
    const [searchOptions, setSearchOptions] = useState(new SearchOptions());

    const onClick = (searchText) => {
        if (isSearching === true) {
            return;
        }

        //TODO: måske tilføj at man kan lave en search på bare advanced settings
        if (searchOptions.searchText === '' || searchOptions.sources.length === 0) {
            setSearchResults([]);
            return;
        }

        setSearchOptions([searchOptions.searchText = searchText]);

        setIsSearching(true);
        setSearchResults(
            GetSearchResult(
                searchOptions,
                setIsSearching, 
                setIsFirstSearchMade
            )
        );
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
