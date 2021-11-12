import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useState } from 'react';
import PaginatedSearchResults from './PaginatedSearchResults'
import SearchResult from './SearchResult';
import '../Css/HomePage.css';

const Home = props => {
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false);
    const [firstSearchMade, setFirstSearchMade] = useState(false)

    const onClick = (searchText)=>{
        if(searching===true) return
        if (searchText === ""){
            setSearchResults([])
            return
        }
        setSearching(true)
        fetch("http://localhost:8081/api/search?input="+encodeURI(searchText))
        .then(response=> response.json())
        .then(json => setSearchResults(json.result))
        .catch(e=>console.log(e))
        .finally(()=>{
            setSearching(false)
            setFirstSearchMade(true)
        })
    }

    return (
        <div className="ContentOfPage">
            <div className="SearchBarPlacement">
                <div className="HeaderDiv">
                    <h1 >Search Contents</h1>
                    <h2 >It is possible to search between multiple datasets of the toolbox!</h2>
                </div>
            <SearchBar
            searchText="Enter your search"
            onClick={onClick}
            loadingState= {searching}
            />
            <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="secondary"
            >
            Advanced
            </Button>
        <div>
            </div>
            <div className="CollapseDiv">
                <Collapse in={open} dimension="width">
                    <StickyBox offsetTop={50}>
                        <div>
                            <Card body style={{ backgroundColor: "darkgray", width: '400px', height: "94vh" }}>
                                <div class="sidebar_component">
                                    <h2 > Filter Datasets</h2>
                                    <div class="checkbox">
                                        <ul class="nobullets">
                                            <li>
                                                <label>
                                                    <p class="sidebar_option_text">Grundfos</p>
                                                    <input type="checkbox" id="option0" name="Grundfos"/>
                                                </label>
                                            </li>
                                            <li>
                                                <label>
                                                    <p class="sidebar_option_text">Nordjyske</p>
                                                    <input type="checkbox" id="option1" name="Nordjyske"/>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </Card>
                        </div>
                    </StickyBox>
                </Collapse>
            </div>
        </div>
        {/*Adds searchResult to the DOM*/}
        <PaginatedSearchResults  itemsPerPage={10} searchResults={searchResults} firstSearchMade={firstSearchMade}/>
    </div>

    )
}

Home.propTypes = {

}

export default Home
