import React from 'react'
import propTypes from 'prop-types'
import '../Css/Suggester.css'

function Suggester({SuggesterData}) {
    const AutoSuggestions = ["1","2","3"];

    return (
        <div className="SuggesterOuter">
            <ul className="list-group list-group-flush" >
                {AutoSuggestions.map(suggestion => {
                    return (
                        <li key={suggestion.toString()} className="list-group-item">{SuggesterData}</li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Suggester;