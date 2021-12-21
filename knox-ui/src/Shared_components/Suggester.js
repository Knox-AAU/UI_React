import React from 'react'
import '../Css/Suggester.css'


function Suggester(props) {
    console.log("props:",props)

    return (
        <div className="SuggesterOuter">
            <ul className="list-group list-group-flush" >
                    
               
                {props.searchData.Results.map(suggestion => {
                    return(
                        <li key={suggestion.Sentence.toString()} className="list-group-item">
                        <div className="searchResultDiv">
                        <small>{suggestion.Sentence}</small>
                        <small id="scoreField" class="text-muted">{suggestion.Score.toFixed(0)}%</small>
                        </div>
                        </li>
                        
                    )
                })
                }

                {/* {SuggesterData.Results.map(suggestion => {
                    if(SuggesterData.Results != null ){
                        return (
                            <li key={suggestion.toString()} className="list-group-item">{suggestion}</li>
                        )
                    } 
                    })
                } */}
            </ul>
        </div>
    )
}


export default Suggester;