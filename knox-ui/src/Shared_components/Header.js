import React from 'react'
import logo from '../Img/logo.svg'
import { Navbar, Nav, Container } from 'react-bootstrap'
import StickyBox from 'react-sticky-box'
import '../Css/Header.css';

const Header = () => {
    return (
    
    <StickyBox>
      <Navbar data-testid="stickyBox" collapseOnSelect expand="lg"  variant="light" style={{padding: 0, backgroundColor: "#242526"}} className="NavBarStyle" >
        <Container data-testid="container" className="ContainerStyle">
        <Navbar.Brand href="/home"><img style={{height:"40px"}} className="img-responsive" src={logo} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" >
              <Nav.Link href="/home" style={{color:"white"}}>Home</Nav.Link>
              <Nav.Link href="/factchecker" style={{color:"white"}}>Fact Checking</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/status" style={{color:"white"}}>Status</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </StickyBox>
    )
}

export default Header
