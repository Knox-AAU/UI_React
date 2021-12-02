import React, { useState } from 'react'
import propTypes from 'prop-types'
import '../Css/Suggester.css'


function Suggester(props) {
    // const [suggestion, setSuggestion]= useState()
    // console.log("Inde i suggesteren",suggesterObject)
    // //console.log("Inde i suggesteren",suggesterObject.Results[0].Sentence)
    // console.log(Object.keys(suggesterObject.Results))
    console.log("props:",props)

    return (
        <div className="SuggesterOuter">
            <ul className="list-group list-group-flush" >
                    
               
                {props.searchData.Results.map(suggestion => {
                    return(
                        <li key={suggestion.Sentence.toString()} className="list-group-item">{suggestion.Sentence}
                        <small id="scoreField" class="text-muted">{suggestion.Score}%</small>
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