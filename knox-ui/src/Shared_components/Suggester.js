import React from 'react'
import propTypes from 'prop-types'
import '../Css/Suggester.css'

function Suggester({ SuggesterData }) {


    return (
        <div className="SuggesterOuter">
            <ul className="list-group list-group-flush" >
                {SuggesterData.Results.length != null && 
                SuggesterData.Results.map(suggestion => {
                    return(
                        <li key={suggestion.toString()} className="list-group-item">{suggestion}</li>
                    )
                })
                }

                {/* {AutoSuggestions.map(suggestion => {
                    if(AutoSuggestions.Results > 0){
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