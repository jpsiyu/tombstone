import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    Image,
} from 'react-bootstrap'
import {language} from './language.js'

class Navigation extends React.Component{
    render(){
        return <Navbar inverse collapseOnSelect fluid> 
            <Navbar.Header>
                <Navbar.Brand>
                    <Image src="/res/stone.png" width={64} height={128}/>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={3} href="#">{language.topics}</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login">{language.sign_in}</NavItem>
                    <NavItem eventKey={2} href="/logout">{language.sign_out}</NavItem>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    }
}

module.exports = {Navigation}