import React, {useState} from "react";
import AdvancedSideBar from "./AdvancedSideBar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {BarLoader} from "react-spinners";
import GetSearchResults from "../../Services/SearchService";
import '../../Css/HomePage.css';
import PaginatedSearchResults from "./PaginatedSearchResults";
import {Alert, Snackbar} from "@mui/material";

const SearchModule = () => {
    const [isFirstSearchMade, setIsFirstSearchMade] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // Input validation
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessages, setAlertMessages] = useState([]);

    // Search filters
    const [input, setInput] = useState("");
    const [sourceFilter, setSourceFilter] = useState([]);
    const [authorFilter, setAuthorFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [beforeDate, setBeforeDate] = useState(null);
    const [afterDate, setAfterDate] = useState(null);

    const handleKeypress = e => e.key === "Enter" && handleSearchSubmitted(e);

    const handleSearchSubmitted = async (e) => {
        e.preventDefault();
        if (isSearching || input.trim() === '') {
            return;
        }

        if (!isInputValid()) {
            return;
        }

        setIsSearching(true);
        try {
            let results = await GetSearchResults(input, sourceFilter, authorFilter, categoryFilter, beforeDate, afterDate);
            setSearchResults(results);
        }
        catch (e) {
            console.error("Unable to get search results: " + e);
        }

        if (!isFirstSearchMade) {
            setIsFirstSearchMade(true);
        }
        setIsSearching(false);
    }

    const isInputValid = () => {
        const errors = [];
        if (beforeDate && isNaN(beforeDate)) {
            errors.push("The 'From' date is invalid.");
        }
        if (afterDate && isNaN(afterDate)) {
            errors.push("The 'To' date is invalid.");
        }
        if (errors.length > 0) {
            setAlertMessages(errors);
            setIsAlertOpen(true);
        }
        return errors.length === 0;
    }

    const handleInputChanged = (e) => {
        e.preventDefault();
        setInput(e.target.value);
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
                            <InputGroup className="mb-3" >
                                <FormControl className='SearchBarStyle'
                                             id="search-bar"
                                             value={input}
                                             onChange={handleInputChanged}
                                             onKeyPress={handleKeypress}
                                             placeholder="Enter your search..."
                                />
                                <Button className='SearchButtonStyle'
                                        onClick={handleSearchSubmitted}
                                        variant="outline-secondary"
                                        id="search-button"
                                        disabled={isSearching}>
                                    <SearchIcon/>
                                </Button>

                            </InputGroup>

                            <Snackbar open={isAlertOpen} onClose={handleOnAlertClosed} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                                <Alert className={"ps-4 pe-4"} variant={"filled"} severity="error" sx={{ width: '100%' }}>
                                    <span>Validation error(s):<br/></span>
                                    { alertMessages.map(msg => (<span className={"ps-2"}>{ msg }<br/></span>)) }
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
                             authorFilter={authorFilter}
                             setAuthorFilter={setAuthorFilter}
                             categoryFilter={categoryFilter}
                             setCategoryFilter={setCategoryFilter}
            />
        </div>
    );
}

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="svg-inline--fa fa-search fa-w-16"
            data-icon="search"
            data-prefix="fas"
            version="1.1"
            viewBox="0 0 512 512"
        >
            <path
                fill="#fffff"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
        </svg>
    );
}

export default SearchModule;