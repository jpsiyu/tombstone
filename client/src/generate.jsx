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
    Row,
    Col,
} from 'react-bootstrap'

import {language} from './language.js'

class Generate extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }


    onSubmit(event){
        event.preventDefault()
        const successFn = () => {
            this._nameElement.value = ''
            this._ageElement.value = ''
            this._lng.value = ''
            this._lat.value = ''
        }
        this.props.addStoneItem(
            this._nameElement.value, 
            this._ageElement.value, 
            [this._lng.value, this._lat.value],
            successFn,
        )
    }

    render(){
        const help = 'name should not be too long'
        return <Row><Col xs={6} sm={3}>
        <Form onSubmit={this.onSubmit}>
            <FormGroup controlId="formInlineName">
                <ControlLabel>{language.generate_name}</ControlLabel>
                <FormControl type="text" placeholder={language.generate_name_enter} inputRef={ref => this._nameElement=ref} /> 
            </FormGroup>
            <FormGroup>
                <ControlLabel>{language.generate_age}</ControlLabel>
                <FormControl type="number" placeholder={language.generate_age_enter} inputRef={ref => this._ageElement=ref}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>{language.generate_lng}</ControlLabel>
                <FormControl type="number" placeholder={language.generate_lng_enter} inputRef={ ref => this._lng=ref}/>
            </FormGroup>
            <FormGroup>
                <ControlLabel>{language.generate_lat}</ControlLabel>
                <FormControl type="number" placeholder={language.generate_lat_enter} inputRef={ ref => this._lat=ref}/>
            </FormGroup>
            <Button bsStyle="primary" type="submit">{language.generate_sure}</Button>
        </Form>
        </Col></Row>
    }
}

module.exports = {Generate}