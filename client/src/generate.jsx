import React from 'react'
import ReactDOM from 'react-dom'
import {
    Form, 
    FormControl, 
    FormGroup, 
    ControlLabel, 
    HelpBlock, 
    Button,
    Alert,
} from 'react-bootstrap'

class Generate extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }


    onSubmit(event){
        event.preventDefault()
        this.props.addStoneItem(
            this._nameElement.value, 
            this._ageElement.value, 
            [this._lng.value, this._lat.value],
        )
        alert(this._nameElement.value + ' added')
        this._nameElement.value = ''
        this._ageElement.value = ''
        this._lng.value = ''
        this._lat.value = ''
    }

    render(){
        const help = 'name should not be too long'
        return <Form onSubmit={this.onSubmit}>
            <FormGroup controlId="formInlineName">
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text" placeholder="enter name" inputRef={ref => this._nameElement=ref} /> 
            </FormGroup>
            <FormGroup>
                <ControlLabel>Age</ControlLabel>
                <FormControl type="number" placeholder="enter age" inputRef={ref => this._ageElement=ref}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Longitude</ControlLabel>
                <FormControl type="number" placeholder="enter longitude" inputRef={ ref => this._lng=ref}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Latitude</ControlLabel>
                <FormControl type="number" placeholder="enter latitude" inputRef={ ref => this._lat=ref}/>
            </FormGroup>
            <Button bsStyle="primary" type="submit">Sure</Button>
        </Form>
    }
}

module.exports = {Generate}