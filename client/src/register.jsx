import React from 'react'
import ReactDOM from 'react-dom'
import {
    PageHeader,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Row,
    Col,
    Jumbotron,
    Image,
} from 'react-bootstrap'
import axios from 'axios'
import {Navigation} from './navigation.jsx'
import {language} from './language.js'

class Register extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.sendToServer(this._username.value, this._email.value, this._passwd.value)
    }

    sendToServer(username, email, password){
        axios.post('/register', {
            username,
            email,
            password,
        }).then(response => {
            if(response.status === 200){
                alert(response.data.message)
                if(response.data.ok){
                    window.location = '/main'
                }
            }else{
                alert('something wrong')
            }
        })
    }

    render(){
        const divStyle = {
            backgroundImage: "url('./res/bg.png')"
        }
        const textStyle = {
            color: 'white'
        }
        return <Jumbotron className="container-fluid">
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>{language.username}</ControlLabel>
                    <FormControl type="text" placeholder={language.username} inputRef={ref => this._username=ref} /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>{language.email}</ControlLabel>
                    <FormControl type="email" placeholder={language.email} inputRef={ref => this._email=ref} /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>{language.password}</ControlLabel>
                    <FormControl type="password" placeholder={language.password} inputRef={ref => this._passwd=ref} /> 
                </FormGroup>
                <Button bsStyle="primary" type="submit">{language.sign_up_word}</Button>
            </Form>
        </Jumbotron>
    }
}

module.exports = Register