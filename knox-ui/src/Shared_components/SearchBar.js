import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../Css/SeacrhBar.css';
import Suggester from './Suggester';
import {HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import ReactDOM from 'react-dom';




function SearchBar({ searchText, onClick, loadingState}) {
    const [searchTerms, setSearchTerms] = useState();
    const [showSuggester, setShowSuggester] = useState(false);

    const searchBarFocus = () => {
        setShowSuggester(true)
    };
    const SearchBarUnfocus = () => setShowSuggester(false);

    const handleKeypress = e => e.key === "Enter" && sendSearch()
    const sendSearch = () => {
        onClick(searchTerms.value)
        searchTerms.value = ""
        setShowSuggester(false)
    }

    const searchFieldChange = e => {
        setSearchTerms(e.target)
        setSuggesterData(e.target.value)
        console.log(SuggesterData)
        sendMessage(SuggesterData)

    }

    

    //Start connection to SignalR for realtime communication to the suggester
    const [connection, setConnection] = useState();
    const [SuggesterData, setSuggesterData] = useState();
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
        Sentence: SuggesterData,
        OrderBy: "ASC",
        MaxResults: 5,
    };

    useEffect(() => {
        joinRoom();
    }, []);
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
                console.log("Før",suggesterObject.Results[0])
                console.log(response)
                suggesterObject = JSON.parse(response);
                setSuggesterResponse(suggesterObject)
                console.log("Efter", suggesterObject.Results[0])
                console.log(suggesterObject.Results[1])
                console.log("Object",Object.keys(suggesterObject.Results.length))
                console.log("value",Object.values(suggesterObject.Results[0].Sentence))
            });


            await SuggesterConnection.start().then(() => {
                ConnectionID = SuggesterConnection.connectionId;
                console.log(ConnectionID)
                setConnection(SuggesterConnection);
            });
            console.log(SuggesterConnection)
        } catch (e) {
            console.log("badness")
            console.log(e);
            timer = setInterval(joinRoom, 10000)
        }
    }

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendGroupMessage", connection.connectionId, "suggestionRequest", JSON.stringify(testObject))
        } catch (e) {
            console.log(e);
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
                    <img src={SearchIcon} height="30px" alt="Search icon" />

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
    showSuggester: false,
}
SearchBar.propTypes = {
    searchText: propTypes.string,
    onClick: propTypes.func.isRequired,
}

export default SearchBar

