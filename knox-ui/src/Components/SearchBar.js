import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'

function SearchBar({ searchText, onClick, loadingState }) {
    const [searchTerms, setSearchTerms] = useState();

    const searchBarStyle = {
        height: "5vh",
        borderRadius: "25px"
    }
    const searchButtonStyle = {
        height: "5vh",
        borderRadius: "25px",
        borderStyle: "none",
    }

    const handleKeypress = e => e.key === "Enter" && sendSearch()
    const sendSearch = () => {
        onClick(searchTerms.value)
        searchTerms.value = ""
    }

    return (
        <InputGroup className="mb-3" >
            <FormControl style={searchBarStyle} onChange={e => setSearchTerms(e.target)}
                id="search-bar"
                placeholder={searchText}
                aria-label="Search Term"
                onKeyPress={handleKeypress}
            />
            <Button style={searchButtonStyle}
                onClick={sendSearch}
                variant="outline-secondary"
                id="search-button">
                <img src={SearchIcon} height="30px" alt="Search icon" />

            </Button>
            <BarLoader loading={loadingState} /> {/*TODO MAKE THIS ELEMENT SHOW UP in a better place*/}

        </InputGroup>


    )
}
SearchBar.defaultProps = {
    searchText: "Enter your search",
    loadingState: false,
}
SearchBar.propTypes = {
    searchText: propTypes.string,
    onClick: propTypes.func.isRequired,
}

export default SearchBar

