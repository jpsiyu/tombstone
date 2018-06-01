import React from 'react'
import ReactDOM from 'react-dom'
import {
    Button, 
    Row, 
    Col, 
    Image, 
    Grid, 
    Media,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'

import {language} from './language.js'

class Stone extends React.Component{
    render(){
        const stoneInfo = this.props.stoneInfo
        const deleteHandler = this.props.deleteStoneItem
        return <div>
            <Row> 
            <Col sm={12} md={6}>
            <ListGroupItem>
            <Media>
                <Media.Left>
                    <Image src="res/stone.png" width={64} height={64} alt="stone" circle />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        {stoneInfo.name}
                    </Media.Heading>
                    <p>{stoneInfo.name}, {language.stone_age}{stoneInfo.age}, {language.stone_location}({stoneInfo.location[0]},{stoneInfo.location[1]})</p>
                </Media.Body>
                <Media.Right>
                    <Button bsStyle="warning" onClick={() => deleteHandler(stoneInfo._id)}>{language.stone_delete}</Button>
                </Media.Right>
            </Media>
            </ListGroupItem>
            </Col>
            </Row>
        </div>
    }
}

class StoneList extends React.Component{
    constructor(){
        super()
        this.state = {
            stoneList: []
        }
    }

    componentWillMount(){
        this.setState({
            stoneList: this.props.fetchData()
        })
    }

    render(){
        const createStone = item=> {
            return <Stone key={item._id} stoneInfo={item} deleteStoneItem={this.props.deleteStoneItem}/>
        }
        return <div>
            <ListGroup>
            {this.state.stoneList.map(createStone)}
            </ListGroup>
        </div>
    }
}

module.exports = {Stone, StoneList}