import React, {useState} from "react";
import AdvancedSideBar from "./AdvancedSideBar";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {BarLoader} from "react-spinners";
import GetSearchResults from "../../Services/SearchService";
import '../../Css/HomePage.css';
import PaginatedSearchResults from "./PaginatedSearchResults";
import {Alert, Snackbar} from "@mui/material";
import SearchBar from "./SearchBar";

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
            .then(setSearchResults)
            .catch(e => console.error("Unable to get search results: " + e));
        if (!isFirstSearchMade) {
            setIsFirstSearchMade(true);
        }
        setIsSearching(false);
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

    const handleOnAlertClosed = (e) => {
        setIsAlertOpen(false);
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
                            />
                            <Snackbar open={isAlertOpen} onClose={handleOnAlertClosed} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                                <Alert className={"ps-4 pe-4"} variant={"filled"} severity="error" sx={{ width: '100%' }}>
                                    <span>Validation error(s):<br/></span>
                                    { alertMessages.map((msg, index) => (<span key={index} className={"ps-2"}>{ msg }<br/></span>)) }
                                </Alert>
                            </Snackbar>
                            <InputGroup className="Loader">
                                <BarLoader loading={isSearching} color='#729A9A' height='15px' width="100%" />
                            </InputGroup>
                            { isFirstSearchMade ? <span>Found {searchResults.length} result(s).</span> : null }
                            <PaginatedSearchResults
                                itemsPerPage={25}
                                searchResults={searchResults}
                                isFirstSearchMade={isFirstSearchMade}
                            />
                        </div>
                        <Button
                            data-testid="advancedButton"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="ButtonStyle"
                            style={{height:"5vh",width:"100px", padding:"0px"}}
                        >
                            Advanced
                        </Button>
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