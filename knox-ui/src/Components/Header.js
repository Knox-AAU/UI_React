import React from 'react'
import logo from '../Img/logo.svg'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = props => {
    return (<Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
    <Container>
    <Navbar.Brand href="/home"><img width="auto" height="5vh" className="img-responsive" src={logo} alt="logo"/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/factchecker">Fact Checking</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/status">Status</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
    )
}

Header.propTypes = {

}

export default Header

/*
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
        </header>*/