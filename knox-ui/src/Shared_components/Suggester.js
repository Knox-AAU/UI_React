import React, { Component } from 'react'
import propTypes from 'prop-types'

 function Suggester({SearchTerm}){
        return (
            <div className="Suggester-Outer">
               <ul className="list-group list-group-flush">
                    <li>{SearchTerm}</li>
               </ul>
            </div>
        )
    }


export default Suggester