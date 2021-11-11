import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
import SearchBar from './SearchBar';
import { useState } from 'react';
import SearchResult from './SearchResult';
import '../Css/HomePage.css';

const Home = props => {
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false);

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const onClick = (searchText) => {
        console.log("start")
        fetch("http://localhost:8081/api/search?input=" + encodeURI(searchText))
            .then(response => response.json())
            .then(json => setSearchResults(json.result))
            .finally(() => {
                setSearching(false)
                console.log("stop")
            })
    }

    return (
        <div className="ContentOfPage">
            <div className="SearchBarPlacement">

                <div className="HeaderDiv">
                    <h1 >Search Contents</h1>
                    <h2 >It is possible to search between multiple datasets of the toolbox!</h2>
                </div>

                <StickyBox offsetTop={50}>
                    <div className="SearchBarPlacement ">
                        <SearchBar
                            searchText="Enter your search"
                            onClick={onClick}
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
                </StickyBox>
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
    )
}

Home.propTypes = {

}

export default Home
