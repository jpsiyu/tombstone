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
            name: username,
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
        }
        const textStyle = {
            textAlign: 'center'
        }
        return <div>
            <Row>
            <Col sm={4} smOffset={4}>
                <Image src='/res/stone.png' circle style={imgStyle}/>
                <h4 style={textStyle}>Sign in to Tombstone</h4>
                <Jumbotron className="container-fluid">
                <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>username</ControlLabel>
                    <FormControl type="text" placeholder="username" inputRef={ref => this._username=ref} /> 
                </FormGroup>
                <FormGroup>
                    <ControlLabel>password</ControlLabel>
                    <FormControl type="password" placeholder="password" inputRef={ref => this._passwd=ref} /> 
                </FormGroup>
                <Button bsStyle="primary" type="submit">Login</Button>
                </Form>
                </Jumbotron>
            </Col>
            </Row>
        </div>
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('login')
)