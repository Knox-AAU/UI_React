import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchBar from '../Shared_components/SearchBar';
import { useState } from 'react';
import PaginatedSearchResults from '../Shared_components/PaginatedSearchResults'
import AdvancedSidebar from '../Shared_components/AdvancedSideBar'
import GetSources from '../Services/SourcesService';
import '../Css/HomePage.css';


const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isFirstSearchMade, setIsFirstSearchMade] = useState(false);
    const [advancedOptions, setAdvancedOptions] = useState(GetSources());

    const onClick = (searchText) => {
        if (isSearching === true) { 
            return;
        }

        if (searchText === "" || advancedOptions.length === 0) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        //TODO: Change to use SearchService
        fetch("http://localhost:8000/api/search?input=" + encodeURI(searchText)+"&sources=" + encodeURI(advancedOptions.join(",")))
            .then(response => response.json())
            .then(json => setSearchResults(json.result))
            .catch(e => console.log(e))
            .finally(() => {
                setIsSearching(false)
                setIsFirstSearchMade(true)
            }
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
                    <Button data-testid="advancedButton"
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
            {/*Adds searchResult to the DOM*/}
                <PaginatedSearchResults itemsPerPage={25}
                                        searchResults={searchResults}
                                        isFirstSearchMade={isFirstSearchMade}
                />
            </div>
            <AdvancedSidebar
                isOpen={isOpen}
                advancedOptions={advancedOptions}
                setAdvancedOptions={setAdvancedOptions}
            />
        </div>
    );
}

Home.propTypes = {

}

export default Home
