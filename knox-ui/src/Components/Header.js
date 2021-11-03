import React from 'react'
import '../Css/Header.css'
import logo from '../logo.svg'
import PropTypes from 'prop-types'

const Header = props => {
    return (
        <header class="Header">
            <div class = "LeftHeader">
                <img id="logo" src={logo} alt="logo"/>
                <ul>
                    <li>Main</li>
                    <li>Truth Seeking</li>
                </ul>
            </div>
            <div class = "RightHeader">
                <ul>
                    <li>Stats</li>
                </ul>
            </div>
        </header>
    )
}

Header.propTypes = {

}

export default Header
