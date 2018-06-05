import React from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    Image,
} from 'react-bootstrap'
import {language} from './language.js'
import {LinkContainer} from 'react-router-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Navigation extends React.Component{
    constructor(){
        super()
        this.onSignOutClick = this.onSignOutClick.bind(this)
    }

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
                    <NavItem eventKey={3}>{language.topics}</NavItem>
                </Nav>
                <Nav pullRight>
                   {this.navRight()} 
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    }

    navRight(){
        if(this.props.forEntry){
            return  <LinkContainer to="/register">
                <NavItem eventKey={1}>{language.sign_up}</NavItem>
            </LinkContainer>
        }else{
            return <NavItem eventKey={2} onClick={this.onSignOutClick}>{language.sign_out}</NavItem>
        }
    }
    
    onSignOutClick(event){
        axios.get('logout').then(response => {
            const serverMsg = response.data
            if(serverMsg.ok){
                window.location = '/'
            }else{
                alert('sign out failed')
            }
        })
    }
}

module.exports = Navigation