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
import {language} from './language.js'


class Login extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.sendToServer(this._username.value, this._passwd.value)
    }

    sendToServer(username, password){
        axios.post('/login', {
            username: username,
            password: password,
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
        const imgStyle = {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 64,
            height: 64,
            marginTop: 100,
        }
        const textStyle = {
            textAlign: 'center'
        }
        return <div>
            {/*
                <Image src='/res/stone.png' circle style={imgStyle}/>
                <h4 style={textStyle}>{language.sign_in_word}</h4>
            */}
                <Jumbotron className="container-fluid">
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>{language.username}</ControlLabel>
                    <FormControl type="text" placeholder={language.username} inputRef={ref => this._username=ref} /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>{language.password}</ControlLabel>
                    <FormControl type="password" placeholder={language.password} inputRef={ref => this._passwd=ref} /> 
                </FormGroup>
                <Button bsStyle="primary" type="submit">{language.sign_in}</Button>
                </Form>
                </Jumbotron>
        </div>
    }
}

module.exports = Login