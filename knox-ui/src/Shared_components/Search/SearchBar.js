import React, {useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../../Css/SeacrhBar.css';
import Suggester from '../Suggester';
import {HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const suggesterHubUrl = process.env.REACT_APP_SUGGESTERHUB_URL;

function SearchBar({ onClick, isSearching, enableSuggester}) {
    const [searchTerms, setSearchTerms] = useState("");
    const [showSuggester, setShowSuggester] = useState(false);
    const [signalRConnection, setSignalRConnection] = useState(null);
    const [suggesterResponse, setSuggesterResponse] = useState(null);

    // Initialization
    useEffect(() => {
        const joinRoom = async () => {
            const SuggesterConnection = new HubConnectionBuilder()
                .withUrl(suggesterHubUrl)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            SuggesterConnection.on("suggestionResponse", (response) => {
                const json = JSON.parse(response);
                console.log(json);
                setSuggesterResponse(json)
            });

            SuggesterConnection.start()
                .then(() => setSignalRConnection(SuggesterConnection))
                .then(() => console.log("Sentence Suggester is ready!"))
                .catch(console.error);
        };
        joinRoom().catch(console.error);
    }, [])

    // Runs whenever 'searchTerms' is changed
    useEffect(() => {
        if(searchTerms?.trim() !== '') {
            setShowSuggester(true);
            sendMessage(searchTerms).catch(console.error);
        }
        else {
            setShowSuggester(false);
        }
    }, [searchTerms]);

    // Event handlers
    const handleSearchBarFocus = () => searchTerms?.trim() !== '' && setShowSuggester(enableSuggester);
    const handleSearchBarUnfocus = () => setShowSuggester(false);
    const handleKeypress = e => e.key === "Enter" && sendSearch();
    const sendSearch = () => {
        sendMessageForEvaluation(searchTerms).catch(console.error);
        if(searchTerms?.trim() !== '') {
            onClick(searchTerms);
            setSearchTerms("");
        }
    }
    const searchFieldChange = e => {
        e.preventDefault();
        setSearchTerms(e.target.value);
    }

    const sendMessageForEvaluation = async (message) => {
        await signalRConnection.invoke("SendGroupMessage", signalRConnection.connectionId, "evalutateSentence", message)
    }

    const sendMessage = async (message) => {
        const messageObject = {
            Sentence: message,
            OrderBy: "ASC",
            MaxResults: 5
        };
        await signalRConnection.invoke("SendGroupMessage", signalRConnection.connectionId, "suggestionRequestTest", JSON.stringify(messageObject));
    }

    return (
        <div style={{ width: "100%" }}>
            <InputGroup className="mb-3" >
                <FormControl className='SearchBarStyle'
                    onChange={searchFieldChange}
                    onFocus={handleSearchBarFocus}
                    onBlur={handleSearchBarUnfocus}
                    id="search-bar"
                    value={searchTerms}
                    placeholder="Enter your search..."
                    aria-label="Search Term"
                    onKeyPress={handleKeypress}
                />
                <Button className='SearchButtonStyle'
                    onClick={sendSearch}
                    variant="outline-secondary"
                    id="search-button"
                    disabled={isSearching}>
                    <SearchIcon/>
                </Button>
            </InputGroup>
            {showSuggester ? <Suggester searchData={suggesterResponse}/> : null}
            <InputGroup className="Loader">
                <BarLoader loading={isSearching} color='#729A9A' height='15px' width="100%" />
            </InputGroup>
        </div>
    )
}

SearchBar.defaultProps = {
    isSearching: false,
    showSuggester: false
}
SearchBar.propTypes = {
    onClick: propTypes.func.isRequired
}

// Replacing search-solid.svg
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

export default SearchBar
