import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useState } from 'react';
import '../../Css/SearchBar.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import {Autocomplete, Button, ButtonGroup, Stack, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const suggesterHubUrl = process.env.REACT_APP_SUGGESTERHUB_URL;

function SearchBar({ onSubmitCallback, isSearching, enableSuggester, setIsSidebarOpen, isSidebarOpen, showFilterButton }) {
    const [searchTerms, setSearchTerms] = useState("");
    const [signalRConnection, setSignalRConnection] = useState(null);
    const [suggestedSentences, setSuggestedSentences] = useState([]);

    // Initialization
    useEffect(() => {
        if (enableSuggester && suggesterHubUrl !== undefined) {
            const SuggesterConnection = new HubConnectionBuilder()
                .withUrl(suggesterHubUrl)
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            SuggesterConnection.on("suggestionResponse", (response) => {
                const json = JSON.parse(response);
                setSuggestedSentences(json?.Results ?? [])
            });

            SuggesterConnection.start()
                .then(() => setSignalRConnection(SuggesterConnection))
                .then(() => console.log("Sentence Suggester is ready!"))
                .catch(e => console.error("Failed to start Sentence Suggester: " + e.message));
        }
        return () => signalRConnection?.stop().then(() => setSignalRConnection(null));
        // This method should only run on initialization, so disable the warning below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Runs whenever 'searchTerms' is changed. Waits 500 ms before updating, and if 'searchTerms' changes again, it stops and starts the timer again.
    useEffect(() => {
        const sendMessage = async (message) => {
            const messageObject = {
                Sentence: message,
                OrderBy: "ASC",
                MaxResults: 5
            };
            await signalRConnection?.invoke("SendGroupMessage", signalRConnection.connectionId, "suggestionRequestTest", JSON.stringify(messageObject));
        };

        const timeoutId = setTimeout(() => {
            if(enableSuggester && searchTerms?.trim() !== '') {
                sendMessage(searchTerms).catch(console.error);
            }
            else {
                setSuggestedSentences([]);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerms, enableSuggester, signalRConnection]);

    // Event handlers
    const handleKeyDown = e => e.key === "Enter" && sendSearch();
    const sendSearch = () => {
        onSubmitCallback(searchTerms);
        if (enableSuggester) {
            sendMessageForEvaluation(searchTerms).catch(console.error);
        }
    }
    const searchFieldChange = (value) => setSearchTerms(value);
    const handleUnfocus = () => setSuggestedSentences([]);

    const sendMessageForEvaluation = async (message) => {
        await signalRConnection?.invoke("SendGroupMessage", signalRConnection.connectionId, "evaluateSentence", message);
    }

    return (
        <div style={{ width: "100%" }}>
            <Stack direction='row'>
                <Autocomplete id={"search-bar"}
                              freeSolo={true}
                              sx={{width: '100%'}}
                              options={suggestedSentences.map(value => value.Sentence)}
                              filterOptions={(options, state) => options}
                              inputMode={'search'}
                              onKeyDown={handleKeyDown}
                              onBlur={handleUnfocus}
                              onInputChange={(event, val) => searchFieldChange(val)}
                              renderInput={(params) => (
                                  <TextField className={"SearchBarStyle form-control form-control-plaintext"}
                                             {...params}
                                             placeholder={"Enter search..."}
                                             sx={{
                                                 "& .MuiOutlinedInput-root": {
                                                     "& > fieldset": {
                                                         borderColor: '#747474'
                                                     }
                                                 }
                                             }}/>
                              )}
                            >
                </Autocomplete>
                <ButtonGroup sx={{margin: 0.9}}>
                    <Button className={"icon-btn-wrapper"}
                            sx={{
                                "&:hover": {
                                    backgroundColor: '#3874cb',
                                    svg: {
                                        color: '#ffffff'
                                    }
                                }
                            }}
                            variant='outlined'
                            onClick={sendSearch}
                            disabled={isSearching}>
                        <SearchIcon className={"icon-btn"} fontSize='large'/>
                    </Button>
                    { showFilterButton ?
                        <Button variant='outlined'
                                sx={{ "&:hover": { backgroundColor: '#3874cb', svg: { color: '#ffffff' }}}}
                                className={"icon-btn-wrapper"}
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <FilterAltIcon className={"icon-btn"} fontSize='large'/>
                        </Button>
                        : null}
                </ButtonGroup>
            </Stack>
        </div>
    )
}

SearchBar.defaultProps = {
    isSearching: false,
    enableSuggester: false,
    showFilterButton: false
}
SearchBar.propTypes = {
    onSubmitCallback: propTypes.func.isRequired
}

export default SearchBar
