import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, NavLink as Link} from 'react-router-dom'
import './index.css'
import axios from 'axios'

import {StoneList} from './stone.jsx'
import {Generate} from './generate.jsx'
import {Topics} from './topics.jsx'

class App extends React.Component{
    constructor(){
        super()
        this.state= {
            stoneList: []
        }
        this.fetchData = this.fetchData.bind(this)
        this.addStoneItem = this.addStoneItem.bind(this)
        this.deleteStoneItem = this.deleteStoneItem.bind(this)
    }

    fetchData(){
        return this.state.stoneList
    }

    fetchServer(){
        axios.get('/api/stones').then(response => {
            if(response.status === 200){
                const genStone = obj => {
                    const stone = {
                        _id: obj._id,
                        name: obj.name,
                        age: obj.age,
                        location: obj.location
                    }
                    return stone
                }
                let stoneList = response.data.map(genStone)
                this.setState({stoneList})
            }
        })
    }

    deleteStoneItem(_id){
        axios.delete('/api/delete', {params: {_id:_id}}).then(response => {
            if(response.status === 200){
                const list = this.state.stoneList.filter( item => item._id !== _id)
                this.setState({
                    stoneList: list
                })
            }else{
                console.log('delte item error')
            }
        })
    }

    addStoneItem(name, age, location){
        axios.post('/api/stone', {
            name: name,
            location: location,
            age: age
        }).then(response => {
            if(response.status === 200){
                response.data
                const item = { 
                    _id: response.data._id,
                    name: response.data.name, 
                    age: response.data.age,
                    location: response.data.location,
                }
                this.state.stoneList.push(item)
                this.setState({stoneList: this.state.stoneList})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentWillMount(){
        this.fetchServer()
    }

    render(){
        return <Router>
        <div className="content">
            <p>Tombstone Record</p>
            <div className="header">
                <ul>
                  <li><Link exact to="/" activeClassName="active">Home</Link></li>
                  <li><Link to="/generate" activeClassName="active">Generate</Link></li>
                  <li><Link to="/topics" activeClassName="active">Topics</Link></li>
                </ul>
            </div>

          <Route exact path="/" component={()=><StoneList fetchData={this.fetchData} deleteStoneItem={this.deleteStoneItem} /> } />
          <Route path="/Generate" component={()=><Generate addStoneItem={this.addStoneItem} /> } />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
)