import React from 'react'
import ReactDOM from 'react-dom'
import {
    PageHeader,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
} from 'react-bootstrap'
import axios from 'axios'

class Register extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.sendToServer(this._username.value, this._passwd.value)
    }

    sendToServer(name, password){
        axios.post('api/register', {
            name: name,
            password: password,
        }).then(response => {
            if(response.status === 200){
                alert(response.data.message)
            }else{
                alert('something wrong')
            }
        })
    }

    render(){
        return <div className="container-fluid">
            <PageHeader>
                Register
            </PageHeader>
            <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <ControlLabel>username</ControlLabel>
                <FormControl type="text" placeholder="username" inputRef={ref => this._username=ref} /> 
            </FormGroup>
            <FormGroup>
                <ControlLabel>password</ControlLabel>
                <FormControl type="password" placeholder="password" inputRef={ref => this._passwd=ref} /> 
            </FormGroup>
            <Button bsStyle="primary" type="submit">Sure</Button>
            </Form>
        </div>
    }
}

ReactDOM.render(
    <Register />,
    document.getElementById('login')
)