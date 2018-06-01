import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Row, Col, Image, Grid, Media} from 'react-bootstrap'

class Stone extends React.Component{
    render(){
        const stoneInfo = this.props.stoneInfo
        const deleteHandler = this.props.deleteStoneItem
        return <div>
            <Media>
                <Media.Left>
                    <Image src="res/stone.png" width={64} height={64} alt="stone" circle />
                </Media.Left>
                <Media.Body>
                    <Media.Heading>
                        {stoneInfo.name}
                    </Media.Heading>
                    <p>{stoneInfo.name} with {stoneInfo.age} at location [{stoneInfo.location[0]},{stoneInfo.location[1]}]</p>
                </Media.Body>
            </Media>
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
        return <div className='stoneList'>
            {this.state.stoneList.map(createStone)}
        </div>
    }
}

module.exports = {Stone, StoneList}