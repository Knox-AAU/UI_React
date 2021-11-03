import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const FactChecker = props => {
    return (
        <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter your search"
                        aria-label="Search Term"
                        aria-describedby="basic-addon2"
                    />
                <Button variant="outline-secondary" id="button-addon2">
                    <img src={SearchIcon} height="40px"/>
                </Button>
                </InputGroup>
        </div>
    )
}
FactChecker.propTypes = {

}

export default FactChecker
