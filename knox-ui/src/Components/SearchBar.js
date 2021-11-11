import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import propTypes from 'prop-types'
import { useState } from 'react';
import '../Css/SeacrhBar.css';



function SearchBar({searchText, onClick}) {
    const [searchTerms, setSearchTerms] = useState("");

    return (
    <InputGroup >
        <FormControl className='SearchBarStyle' onChange={e => setSearchTerms( e.target.value) }
            id= "search-bar"
            placeholder= {searchText} 
            aria-label="Search Term"
        />
        <Button className='SearchButtonStyle'
            onClick={() => onClick(searchTerms)}
            variant="outline-secondary"
            id="search-button">
                <img src={SearchIcon} className="ImgStyle" alt="Search icon"/>
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

