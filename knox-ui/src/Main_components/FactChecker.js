import React from 'react'
import Button from 'react-bootstrap/Button';
import SearchBar from '../Shared_components/SearchBar';
import { useState } from 'react';
import PaginatedSearchResults from '../Shared_components/PaginatedSearchResultsFact'
import '../Css/HomePage.css';
import AdvancedSidebar from '../Shared_components/AdvancedSideBarFact'


const FactChecker = props => {
    const [searchResults, setSearchResults] = useState([])
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [firstSearchMade, setFirstSearchMade] = useState(false)
    const EnumMaps = {
        "DefaultPassageExtraction": 0,
        "Rake": 1,
        "TFIDF": 0,
        "Levenshtein": 0,
        "Jaccard": 1,
        "Cosine": 2,
        "WordEmbedding": 3,
        "TMWIIS": 4,
        "SimRank": 1
    }
// OBS OBS OBS! if more databases are added, add the names here as well as in the checkboxes on Advanced Sidebar!
const [advancedOptions, setAdvancedOptions] = useState(["DefaultPassageExtraction", "TFIDF"])
    const onClick = (searchText) => {
        if (searching === true) return
        if (searchText === "") {
            setSearchResults([])
            return
        }
        if (searchText === "gettriple") {
            fetch("http://localhost:4605/Triple", {
            method: "GET",
            Headers: {
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json'
            }
            }).then((x) => x.json())
            .then((data) => console.log(data));
        } else {
            var Items = [];

            var item = {
                s: "",
                r: "",
                t: "",
                "passage": ""
            };
            searchText.split(" ").forEach(element => {
                if (item.s === "") {
                    item.s = element;
                } else if (item.r === "") {
                    item.r = element;
                } else if (item.t === "") {
                    item.t = element;
                    Items.push(item);
                    item = {
                        s: "",
                        r: "",
                        t: "",
                        "passage": ""
                    };
                }
            });
            if (item.s !== "" || item.r !== "") {
                Items.push(item);
            }
            console.log({"log":advancedOptions});
            let body = {
                "PassageExtraction": 0,
                "ArticleRetrieval": 0,
                "PassageRankings": [],
                "ConfidenceEnum": 0,
                "MultipleKnowledgeGraphItem": {
                        "Items": Items
                    },
                "passage": ""
                };
            advancedOptions.forEach(e => {
                if (e === "SimRank") body.ConfidenceEnum = 1;
                else if (e === "Levenshtein") body.PassageRankings.push(EnumMaps["Levenshtein"]);
            });

            body = JSON.stringify(body);
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json; charset=utf-8');
            myHeaders.append('Access-Control-Allow-Origin', "*");
            myHeaders.append('Access-Control-Allow-Headers', "Content-Type, Accept");
            fetch("http://localhost:4605/Triple/AlgChooser", {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: body
            }).then(response => response.json())
            .then()
            .then(json =>  {
                setSearchResults(json.articles);
                setSearching(false)
                setFirstSearchMade(true)
            }
                )
            .catch(e => console.log(e))
            .finally(() => {
                console.log(advancedOptions);
            })
        }
    }

    return (
        <div className="ContentOfPage">
            <div className='SearchBarPlacement'>
                <div data-testid="headerDiv" className="HeaderDiv">
                    <h1 >Fact Checker</h1>
                    <h2 >It is possible to fact check the data of the toolbox!</h2>
                </div>
                <SearchBar 
                    searchText="Enter potential truth"
                    onClick={onClick}
                />
            <Button data-testid="advancedButton"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className="ButtonStyle"
                    >
                        Advanced
                    </Button>
            </div>
            <PaginatedSearchResults itemsPerPage={25} searchResults={searchResults} firstSearchMade={firstSearchMade}/>
            <AdvancedSidebar open={open} advancedOptions={advancedOptions} setAdvancedOptions={setAdvancedOptions}/>
            
        </div>
    )
}
FactChecker.propTypes = {

}

export default FactChecker
