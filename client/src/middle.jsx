import React from 'react'
import {Row, Col} from 'react-bootstrap'

class Middle extends React.Component{
    render(){
        return <Row>
            <Col sm={4} smOffset={4}>
                {this.props.children}
            </Col>
        </Row>
    }
}

module.exports = Middle