import React, { useState } from "react";
import AdvancedSideBar from "./AdvancedSideBar";
import { InputGroup } from "react-bootstrap";
import BarLoader from "react-spinners/BarLoader";
import GetSearchResults from "../../Services/SearchService";
import PaginatedSearchResults from "./PaginatedSearchResults";
import SearchBar from "./SearchBar";
import AlertPopup from "../AlertPopup";
import '../../Css/HomePage.css';

const SearchModule = () => {
    const [isFirstSearchMade, setIsFirstSearchMade] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Input validation
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessages, setAlertMessages] = useState([]);

    // Search filters
    const [sourceFilter, setSourceFilter] = useState([]);
    const [authorFilter, setAuthorFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [beforeDate, setBeforeDate] = useState(null);
    const [afterDate, setAfterDate] = useState(null);

    const handleSearchSubmitted = async (searchBarText) => {
        if (isSearching || !isInputValid()) {
            return;
        }
        setIsSearching(true);
        GetSearchResults(searchBarText, sourceFilter, authorFilter, categoryFilter, beforeDate, afterDate)
            .then(results => setSearchResults(results ?? []))
            .catch(e => {
                console.error("Unable to get search results: " + e);
                setAlertMessages(["An error occurred while connecting to the access API"]);
                setIsAlertOpen(true);
            })
            .finally(() => {
                setIsSearching(false);
                if (!isFirstSearchMade) {
                    setIsFirstSearchMade(true);
                }
            });
    }

    const isInputValid = () => {
        const errors = [];
        if (beforeDate && isNaN(beforeDate)) {
            errors.push("The 'To' date is invalid.");
        }
        if (afterDate && isNaN(afterDate)) {
            errors.push("The 'From' date is invalid.");
        }
        if (errors.length > 0) {
            setAlertMessages(errors);
            setIsAlertOpen(true);
        }
        return errors.length === 0;
    }

    return (
        <div className="ContentOfPage">
            <div className="SearchWrapper">
                <div className="SearchBarPlacement">
                    <div className="HeaderDiv">
                        <h1 >Search Contents</h1>
                        <h2 >It is possible to search between multiple datasets of the toolbox!</h2>
                    </div>
                    <div style={{display:'inline-flex',width:"100%",position:'relative'}}>
                        <div style={{ width: "100%" }}>
                            <SearchBar onSubmitCallback={handleSearchSubmitted}
                                       enableSuggester={true}
                                       isSearching={isSearching}
                                       setIsSidebarOpen={setIsSidebarOpen}
                                       isSidebarOpen={isSidebarOpen}
                                       showFilterButton={true}
                            />
                            <AlertPopup
                                isAlertOpen={isAlertOpen}
                                setIsAlertOpen={setIsAlertOpen}
                                alertMessages={alertMessages}
                            />
                            { isSearching ?
                                <InputGroup className="Loader">
                                    <BarLoader loading={isSearching} color='#729A9A' height='15px' width="100%" />
                                </InputGroup>
                                : null
                            }

                            { isFirstSearchMade && !isSearching ?
                                <span>Found {searchResults.length} result(s).</span>
                                : null
                            }
                            { searchResults?.length > 0 ?
                                <PaginatedSearchResults itemsPerPage={25} searchResults={searchResults} isFirstSearchMade={isFirstSearchMade}/>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <AdvancedSideBar isOpen={isSidebarOpen}
                             sourceFilter={sourceFilter}
                             setSourceFilter={setSourceFilter}
                             beforeDate={beforeDate}
                             setBeforeDate={setBeforeDate}
                             afterDate={afterDate}
                             setAfterDate={setAfterDate}
                             setAuthorFilter={setAuthorFilter}
                             setCategoryFilter={setCategoryFilter}
            />
        </div>
    );
}

export default SearchModule;