import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../Css/SeacrhBar.css';
/*import Suggester from './Suggester';*/
import {HubConnectionBuilder, LogLevel } from '@microsoft/signalr';




function SearchBar({ searchText, onClick, loadingState/*, enableSuggester*/}) {
    const [searchTerms, setSearchTerms] = useState();
/*    const [showSuggester, setShowSuggester] = useState(false);*/
    let searchtermscurrent = "";

/*    const searchBarFocus = () => {
        if(searchtermscurrent !=="" && searchtermscurrent !== null){
        setShowSuggester(true)
        }

    };*/
/*    const SearchBarUnfocus = () => setShowSuggester(false);*/

    const handleKeypress = e => e.key === "Enter" && sendSearch()
    const sendSearch = () => {
        onClick(searchTerms.value)
        sendForEvaluation(searchTerms.value)
        searchTerms.value = ""
        searchtermscurrent = ""
        /*setShowSuggester(false)*/
    }

    const searchFieldChange = e => {
        setSearchTerms(e.target)
        searchtermscurrent = e.target.value
        if(searchtermscurrent !=="" && searchtermscurrent != null){
            /*setShowSuggester(true)*/
            console.log("Here" + searchtermscurrent)
            sendMessage(searchtermscurrent)
        }
/*        else{
            setShowSuggester(false)
        }*/

    }

    

    //Start connection to SignalR for realtime communication to the suggester
/*    const [connection, setConnection] = useState();
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
            console.log("badness")
            console.log(e);
            timer = setInterval(joinRoom, 10000)
        }
    }*/

/*
    useEffect(() => {
        joinRoom();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const sendForEvaluation = async (message) => {
        try {
            await connection.invoke("SendGroupMessage", connection.connectionId, "evalutateSentence", message)
        } catch (e) {
            console.log(e);
        }
    }
    const sendMessage = async (message) => {
        testObject["Sentence"] = message 
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
}*/
SearchBar.defaultProps = {
    searchText: "Enter your search",
    loadingState: false,
/*    showSuggester: false,*/
}
SearchBar.propTypes = {
    searchText: propTypes.string,
    onClick: propTypes.func.isRequired,
}

export default SearchBar