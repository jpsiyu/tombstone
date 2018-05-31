import React from 'react'
import ReactDOM from 'react-dom'
import './stone.css'

class Stone extends React.Component{
    render(){
        const stoneInfo = this.props.stoneInfo
        return <div className='stone'>
            <div className='stone_img'>
                <img src="res/stone.png" alt="stone" />
            </div>
            <div className='stone_desc'>
                <p>{stoneInfo.name}</p>
                <p>[{stoneInfo.location[0]},{stoneInfo.location[1]}]</p>
            </div>
        </div>
    }
}

class StoneList extends React.Component{
    constructor(){
        super()
        this.state = {
            stoneList: this.fetchData()
        }
    }

    fetchData(){
        const stoneList = [
            {
                id:1,
                name: 'Jason',
                location:[20, 30]
            },
            {
                id:2,
                name: 'Bill',
                location:[10, 98]
            },
            {
                id:3,
                name: 'Rose',
                location:[128, 890]
            },
        ]
        return stoneList
    }

    render(){
        const createStone = item=> {
            return <Stone key={item.id} stoneInfo={item}/>
        }
        return <div className='stoneList'>
            {this.state.stoneList.map(createStone)}
        </div>
    }
}

module.exports = {Stone, StoneList}