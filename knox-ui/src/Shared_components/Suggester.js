import React from 'react'
import '../Css/Suggester.css'


function Suggester(props) {

    return (
        <div className="SuggesterOuter">
            <ul className="list-group list-group-flush" >
                {props.searchData.Results.map(suggestion => {
                    return(
                        <li key={suggestion.Sentence.toString()} className="list-group-item">
                            <div className="searchResultDiv">
                                <small>
                                    {suggestion.Sentence}
                                </small>
                                <small id="scoreField" className='text-muted'>
                                    {suggestion.Score.toFixed(0)}%
                                </small>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}


export default Suggester;