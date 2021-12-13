import React, { useState } from "react"
import axios from 'axios'
import parse from "html-react-parser"
import PropTypes from 'prop-types'
import "../Css/Visualiser.css"

const Visualiser = props => {

    const [ResponsePayload, setResponsePayload] = useState(null)
    const [ResponseError, setResponseError] = useState(true)
    const [TextInput, setTextInput] = useState("")
    const [Publisher, setPublisher] = useState(0)

    const clickHandlerNer = () => sendNerRequest(TextInput)
    const changeHandler = (e) => setTextInput(e.target.value)

    const clickHandlerKG = () => sendKGRequest(TextInput)

    const sendNerRequest = async value => {
        try {
            const payload = JSON.stringify({'publisher': props.publishers[Publisher], 'text': value})
            const response = await axios.post(props.url, payload, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            setResponsePayload(response.data)
            setResponseError(false)
        }
        catch (error) {
            setResponsePayload("Error retrieving visualised text.")
            setResponseError(true)
            console.error("Error retrieving visualised text.")
        }
    }

    const sendKGRequest = async value => {
        try {
            const payload = JSON.stringify({'publisher': props.publishers[Publisher], 'text': value})
            const response = await axios.post(props.url2, payload, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            setResponsePayload(response.data)
            setResponseError(false)
        }
        catch (error) {
            setResponsePayload("Error retrieving Knowledge Graph")
            setResponseError(true)
            console.error("Error retrieving Knowledge Graph")
        }
    }

    return (
        <div className="visualise-wrapper knowledgelayerelement">
            <div className="visualiser-text-input">
                <input type='text' onChange={changeHandler} />
                <select onChange={e => {console.log(e); setPublisher(e.target.options.selectedIndex)}}>
                    { props.publishers.map(publisher => <option value={publisher}>{publisher}</option>) }
                </select>
            </div>
            <div class="NJGFButtons">
              <button onClick={clickHandlerNer} className="visualiser-button">Visualise</button>
              <button onClick={clickHandlerKG} className="visualiser-button">Show Triples</button>
            </div>
            <div className="visualiser-text">
                <h3>Result</h3>
                {!ResponseError ? parse(ResponsePayload) : <div className="visualiser-error"><b>{ResponsePayload}</b></div>}
            </div>
        </div>
    )
}

Visualiser.propTypes = {
        url: PropTypes.string.isRequired,
        url2: PropTypes.string.isRequired,
        publishers: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Visualiser
