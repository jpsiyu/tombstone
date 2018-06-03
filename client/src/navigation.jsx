import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    Image,
} from 'react-bootstrap'

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
                    <NavItem eventKey={1} href="#">StoneList</NavItem>
                    <NavItem eventKey={2} href="#">Generate</NavItem>
                    <NavItem eventKey={3} href="#">Topics</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/login">login</NavItem>
                    <NavItem eventKey={2} href="/logout">logout</NavItem>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    }
}

module.exports = {Navigation}