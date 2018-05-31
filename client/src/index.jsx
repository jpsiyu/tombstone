import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, NavLink as Link} from 'react-router-dom'
import './index.css'

import {StoneList} from './stone.jsx'
import {Generate} from './generate.jsx'

const About = () => <p>About</p>
const Topics = () => <p>Topics</p>

class App extends React.Component{
    constructor(){
        super()
        this.state= {
            stoneList: this.fetchServer()
        }
        this.fetchData = this.fetchData.bind(this)
        this.addStoneItem = this.addStoneItem.bind(this)
    }

    fetchData(){
        return this.state.stoneList
    }

    fetchServer(){
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

    addStoneItem(name){
        const id = this.state.stoneList.length + 1
        const item = {id:id, name:name, location:[20,30]}
        const newList = this.state.stoneList.push(item)
        this.setState({stoneList: this.state.stoneList})
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

          <Route exact path="/" component={()=><StoneList fetchData={this.fetchData} /> } />
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