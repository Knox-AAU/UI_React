import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import { BarLoader } from 'react-spinners'
import '../Css/SeacrhBar.css';
import Suggester from './Suggester';

function SearchBar({ searchText, onClick, loadingState }) {
    const [searchTerms, setSearchTerms] = useState();
    const [showSuggester, setShowSuggester]= useState(false);

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
        
    }

    return (
        <div style={{width:"100%"}}>
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
            { showSuggester ? <Suggester SearchTerm={"test"}/> : null }
            <InputGroup className="Loader">
                <BarLoader loading={loadingState} color='#729A9A' height='15px' width="100%"/> 
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

