import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../Css/SeacrhBar.css';
import Suggester from './Suggester';
import {HubConnectionBuilder, LogLevel } from '@microsoft/signalr';




function SearchBar({ searchText, onClick, loadingState, enableSuggester}) {
    const [searchTerms, setSearchTerms] = useState();
    const [showSuggester, setShowSuggester] = useState(false);
    let searchtermscurrent = "";

    const searchBarFocus = () => {
        if(searchtermscurrent !== '' && searchtermscurrent !== null) {
            setShowSuggester(enableSuggester);
        }

    };
    const SearchBarUnfocus = () => setShowSuggester(false);

    const handleKeypress = e => e.key === "Enter" && sendSearch();
    const sendSearch = () => {
        onClick(searchTerms.value);
        sendForEvaluation(searchTerms.value);
        searchTerms.value = "";
        searchtermscurrent = "";
        setShowSuggester(false);
    }

    const searchFieldChange = e => {
        setSearchTerms(e.target);
        searchtermscurrent = e.target.value;
        if(searchtermscurrent !== '' && searchtermscurrent != null) {
            setShowSuggester(true);
            sendMessage(searchtermscurrent);
        }
        else {
            setShowSuggester(false);
        }
    }

    //Start connection to SignalR for realtime communication to the suggester
    const [connection, setConnection] = useState();
    let suggesterObject = {
        ResultLength: 0,
        Results:[{
            Sentence:"",
            Score: 0
        }]
    };

    const [SuggesterResponse, setSuggesterResponse] = useState(suggesterObject);
    let ConnectionID;
    let SuggesterConnection;

    let testObject = {
        Sentence: "",
        OrderBy: "ASC",
        MaxResults: 5,
    };

    let timer;

    async function joinRoom() {

        try {
            clearInterval(timer)
            SuggesterConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:8081/suggestorHub")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

            SuggesterConnection.on("suggestionResponse", (response) => {
                suggesterObject = JSON.parse(response);
                setSuggesterResponse(suggesterObject)
 
            });


            await SuggesterConnection.start().then(() => {
                ConnectionID = SuggesterConnection.connectionId;
                console.log(ConnectionID)
                setConnection(SuggesterConnection);
            });
            console.log(SuggesterConnection)
        } catch (e) {
            timer = setInterval(joinRoom, 10000)
        }
    }

    useEffect(() => {
        joinRoom();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const sendForEvaluation = async (message) => {
        try {
            //await connection.invoke("SendGroupMessage", connection.connectionId, "evalutateSentence", message)
        } catch (e) {
            console.log(e);
        }
    }
    const sendMessage = async (message) => {
        testObject["Sentence"] = message 
        try {
            //await connection.invoke("SendGroupMessage", connection.connectionId, "suggestionRequest", JSON.stringify(testObject))
        } catch (e) {
            console.warn(e);
        }
    }


    return (
        <div style={{ width: "100%" }}>
            <InputGroup className="mb-3" >
                <FormControl className='SearchBarStyle'
                    onChange={searchFieldChange}
                    onFocus={searchBarFocus}
                    onBlur={SearchBarUnfocus}
                    id="search-bar"
                    placeholder={searchText}
                    aria-label="Search Term"
                    onKeyPress={handleKeypress}
                />
                <Button className='SearchButtonStyle'
                    onClick={sendSearch}
                    variant="outline-secondary"
                    id="search-button">
                    <SearchIcon/>
                </Button>
            </InputGroup>
            {showSuggester ? <Suggester searchData={SuggesterResponse}/> : null}
            <InputGroup className="Loader">
                <BarLoader loading={loadingState} color='#729A9A' height='15px' width="100%" />
            </InputGroup>
        </div>
    )
}
SearchBar.defaultProps = {
    searchText: "Enter your search",
    loadingState: false,
/*    showSuggester: false,*/
}
SearchBar.propTypes = {
    searchText: propTypes.string,
    onClick: propTypes.func.isRequired,
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
