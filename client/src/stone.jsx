import React from 'react'
import ReactDOM from 'react-dom'
import './stone.css'

class Stone extends React.Component{
    render(){
        const stoneInfo = this.props.stoneInfo
        const deleteHandler = this.props.deleteStoneItem
        return <div className='stone'>
            <div className='stone_img'>
                <img src="res/stone.png" alt="stone" />
            </div>
            <div className='stone_desc'>
                {stoneInfo.name} at location [{stoneInfo.location[0]},{stoneInfo.location[1]}]
                <button onClick={ () => deleteHandler(stoneInfo.id)}>Delete</button>
            </div>
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
            return <Stone key={item.id} stoneInfo={item} deleteStoneItem={this.props.deleteStoneItem}/>
        }
        return <div className='stoneList'>
            {this.state.stoneList.map(createStone)}
        </div>
    }
}

module.exports = {Stone, StoneList}