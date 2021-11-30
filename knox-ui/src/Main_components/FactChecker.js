import React from 'react'
import '../Css/FactChecker.css';
import { useState, useMemo } from 'react';
import '../Css/SearchResult.css';



const FactChecker = props => {
    const [triples, setTriples] = useState([])


    const firstRender = useMemo(
    () =>  {
    fetch("http://localhost:8000/gettriples")
                .then(response => response.json())
                .then(json => setTriples(json))
                .catch(e => console.log(e))
                .finally(() => {
                    console.log(triples);
                })},
    []
  );
    const onClick = (searchText) => {
        console.log(triples)
    }

    return (
        <div className="ContentOfPage">
            <div className='SearchBarPlacement'>
                <div className="HeaderDiv">
                    <h1 >Fact Checker</h1>
                    <h2 >Click on a triple to factcheck it!</h2>
                </div>
                {triples && triples.map(triple => (
                    <div className="searchResultDiv">
                        <h2>
                            <a href={""} target="_blank" rel="noreferrer">{triple}</a>
                        </h2>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
FactChecker.propTypes = {

}

export default FactChecker
