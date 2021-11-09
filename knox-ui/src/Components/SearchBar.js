import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';


function SearchBar({searchText, onClick}) {
    const [searchTerms, setSearchTerms] = useState("");

    return (
    <InputGroup className="mb-3" style={{maxHeight: "5vh"}}>
        <FormControl onChange={e => setSearchTerms( e.target.value) }
            placeholder= {searchText} 
            aria-label="Search Term"
            aria-describedby="basic-addon2"
        />
        <Button onClick={() => onClick(searchTerms)} variant="outline-secondary" id="button-addon2">
            <img src={SearchIcon} height="40px"/>
        </Button>
    </InputGroup>
    )
}
SearchBar.defaultProps= {
    searchText : "Enter your search"
}
SearchBar.propTypes = {
    searchText: propTypes.string,
    onClick: propTypes.func.isRequired
}

export default SearchBar

