import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../Css/SeacrhBar.css';

function SearchBar({ searchText, onClick, loadingState }) {
    const [searchTerms, setSearchTerms] = useState();

    const handleKeypress = e => e.key === "Enter" && sendSearch()
    const sendSearch = () => {
        onClick(searchTerms.value)
        searchTerms.value = ""
    }

    return (
        <div>
            <InputGroup className="mb-3" >
                <FormControl className='SearchBarStyle' onChange={e => setSearchTerms(e.target)}
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
            <InputGroup className="Loader">
                <BarLoader loading={loadingState} color='#0d6efd' height='15px' width="100%"/> 
            </InputGroup>
        </div>
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

