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
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function SearchBar({ searchText, onClick, loadingState }) {
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
        sendMessage(SuggesterData)
    }

    const searchFieldChange = e => {
        setSearchTerms(e.target)
        setSuggesterData(e.target.value)
        console.log(SuggesterData)
    }

    //Start connection to SignalR for realtime communication to the suggester
    const [connection, setConnection] = useState();
    const [SuggesterData, setSuggesterData] = useState();
    useEffect(() => {
        joinRoom();
    }, []);

    async function joinRoom(user, message) {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:8081/chathub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (message) => {
                alert("Message Received: " +  message);
                console.log("Message Received: ", message);
            });

            await connection.start();
            console.log("success")
            setConnection(connection);
        } catch (e) {
            console.log("badness")
            console.log(e);

        }
    }

    const sendMessage = async (message) =>{
        try {
            await connection.invoke("SendMessage", (message))
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
            {showSuggester ? <Suggester searchData={SuggesterData} /> : null}
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

