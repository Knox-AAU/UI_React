import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import StickyBox from "react-sticky-box/dist/esnext";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useState } from 'react';


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
    
    const homeStyle = {
        marginTop: "8vh",
        display: "flex",
        width: "100%",
        alignItems: "stretch",
        marginLeft: "10vh"
    }

    return (
    <div style={{homeStyle}}>
        
        <div style={{homeStyle, display: "block", width: "100%"}}>
            <SearchBar
            searchText="Enter your search"
            onClick={onClick}
            loadingState= {searching}
            />
            <div style={{float: "right"}}>
                <StickyBox offsetTop={50}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card body style={{backgroundColor: "darkgray", width: '400px', height: "94vh", position:"sticky"}}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </Card>
                    </div>
                </Collapse>
                </StickyBox>
            </div>
        </div>
        <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="secondary"
        >
            Advanced
        </Button>
        {/*Adds searchResult to the DOM*/}
        <SearchResults searchResults={searchResults} firstSearchMade={firstSearchMade}/>
    </div>
    )
}
Home.propTypes = {

}

export default Home
