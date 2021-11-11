import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
import SearchBar from './SearchBar';
import { useState } from 'react';
import SearchResult from './SearchResult';
import '../Css/AdvancedButton.css';

const Home = props => {
    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false);

    const onClick = (searchText)=>{
        console.log("start")
        fetch("http://localhost:8081/api/search?input="+encodeURI(searchText))
        .then(response=> response.json())
        .then(json => setSearchResults(json.result))
        .finally(()=>{
            setSearching(false)
            console.log("stop")
        })


    }
    
    const homeStyle = {
        marginTop: "8vh",
        display: "flex",
        width: "100%",
        alignItems: "stretch",
        marginLeft: "10vh"
    }

    return (

    <div className='outerbox'>
        <h1> Search Engine </h1>
        <div className='searchBarPlacement'>
            <SearchBar
            searchText="Enter your search"
            onClick={onClick}
            /> 
            <div style={{float: "right"}}>
            <Collapse in={open} dimension="width">
                <StickyBox offsetTop={50}>
                    <div id="example-collapse-text">
                        <Card body style={{backgroundColor: "cyan", width: '400px', height: "94vh", position:"sticky"}}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </Card>
                    </div>
                </StickyBox>
            </Collapse>
        </div>
        
        <Button className='advancedButtonStyle advancedButtonPlacement'
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="secondary"
        >
            Advanced
        </Button>
        {/*Adds searchResult to the DOM*/}
        {searchResults.map(result => {
            return (<SearchResult searchResult = {result}/>
                )
            })}

    </div>
    )
}
Home.propTypes = {

}

export default Home
