import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import SearchIcon from '../Img/search-solid.svg'
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'

import { useState } from 'react';

const Home = props => {
    const [open, setOpen] = useState(false);
    return (
    <div style={{display: "flex", width: "100%", alignItems: "stretch"}}>
        <div style={{display: "block", width: "100%"}}>
        <InputGroup className="mb-3" style={{maxHeight: "5vh"}}>
            <FormControl
                placeholder="Enter your search"
                aria-label="Search Term"
                aria-describedby="basic-addon2"
            />
            <Button variant="outline-secondary" id="button-addon2">
                <img src={SearchIcon} height="40px"/>
            </Button>
            <>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Advanced
                </Button>
            </>
        </InputGroup>
        
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        <h1>Sup fam</h1>
        </div>
            <div style={{float: "right"}}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        <Card body style={{backgroundColor: "cyan", width: '400px', height: "94vh", position:"sticky"}}>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                            labore wes anderson cred nesciunt sapiente ea proident.
                        </Card>
                    </div>
                </Collapse>
            </div>
        
    </div>
    

    )
}
Home.propTypes = {

}

export default Home
