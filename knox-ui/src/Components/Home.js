import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
import SearchBar from './SearchBar';
import { useState } from 'react';
import PaginatedSearchResults from './PaginatedSearchResults'
import AdvancedSidebar from './AdvancedSideBar'
import '../Css/HomePage.css';

const Home = props => {
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false);
    const [firstSearchMade, setFirstSearchMade] = useState(false)
    const [advancedOptions, setAdvancedOptions] = useState([])

    const onClick = (searchText) => {
        if (searching === true) return
        if (searchText === "") {
            setSearchResults([])
            return
        }
        setSearching(true)
        console.log(encodeURI(advancedOptions.join(",")))
        fetch("http://localhost:8081/api/search?input=" + encodeURI(searchText)+"&sources=" + encodeURI(advancedOptions.join(",")))
            .then(response => response.json())
            .then(json => setSearchResults(json.result))
            .catch(e => console.log(e))
            .finally(() => {
                setSearching(false)
                setFirstSearchMade(true)
            })
    }

    return (
        <div className="ContentOfPage">
            <div className="SearchWrapper">
                <div className="SearchBarPlacement">
                    <div className="HeaderDiv">
                        <h1 >Search Contents</h1>
                        <h2 >It is possible to search between multiple datasets of the toolbox!</h2>
                    </div>
                    <SearchBar
                        searchText="Enter your search"
                        onClick={onClick}
                        loadingState={searching}
                    />
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        variant="secondary"
                    >
                        Advanced
                    </Button>
                    
                </div>
            {/*Adds searchResult to the DOM*/}
            <PaginatedSearchResults itemsPerPage={10} searchResults={searchResults} firstSearchMade={firstSearchMade}/>
            </div>
            <AdvancedSidebar open={open} advancedOptions={advancedOptions} setAdvancedOptions={setAdvancedOptions}/>
        </div>

    )
}

Home.propTypes = {

}

export default Home
