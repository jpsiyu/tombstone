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

class Register extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.sendToServer(this._username.value, this._email.value, this._passwd.value)
    }

    sendToServer(name, email, password){
        axios.post('/register', {
            name: name,
            email: email,
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
        const divStyle = {
            backgroundImage: "url('./res/bg.png')"
        }
        const textStyle = {
            color: 'white'
        }
        return <div style={divStyle} >
            <Navigation />
            <Row>
                <Col sm={4} smOffset={1}>
                    <h1 style={textStyle}>Tombstone bla bla bla</h1>
                    <p style={textStyle}>
                        blafsdofj sdjfsdjf sodfjoasdjf sdjf jsdfljsdfj sldjfsdj  fsfj
                        sjfosjdfoasdjfljasdlfjlasjdflajsdfljasldfjasfdljsalfj
                        sdfsfjsdjflsajdflsjdf ljsdfljsdlfjlasjdflsajf
                    </p>
                </Col>

                <Col sm={4} smOffset={1} >
                    <Jumbotron className="container-fluid">
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <ControlLabel>username</ControlLabel>
                            <FormControl type="text" placeholder="username" inputRef={ref => this._username=ref} /> 
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>email</ControlLabel>
                            <FormControl type="email" placeholder="email" inputRef={ref => this._email=ref} /> 
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>password</ControlLabel>
                            <FormControl type="password" placeholder="password" inputRef={ref => this._passwd=ref} /> 
                        </FormGroup>
                        <Button bsStyle="primary" type="submit">Sign up for tombstone</Button>
                    </Form>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    }
}

ReactDOM.render(
    <Register />,
    document.getElementById('register')
)