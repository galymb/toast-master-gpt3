import React from 'react'
import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container } from 'react-bootstrap'
import logo from "../logo.png"


class Navigation extends Component {
    render() {
        return(
            <div> 
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="/"> 
                        <img
                        src={logo}
                        width="30"
                        height="30"
                        />
                        powered by GPT-3
                    </Navbar.Brand>
                    </Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="gpt3">What is GPT-3</Nav.Link>
                    <Nav.Link href="about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navigation
