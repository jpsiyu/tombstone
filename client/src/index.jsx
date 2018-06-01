import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import './index.css'
import axios from 'axios'
import {PageHeader, Nav, NavItem} from 'react-bootstrap'

import {StoneList} from './stone.jsx'
import {Generate} from './generate.jsx'
import {Topics} from './topics.jsx'

import {language} from './language.js'

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
        <div className="container">
            <PageHeader>
                {language.index_title}
            </PageHeader>
            <Nav bsStyle="tabs">
                <LinkContainer exact to="/">
                    <NavItem eventKey={1}>{language.index_home}</NavItem>
                </LinkContainer>
                <LinkContainer to="/generate">
                    <NavItem eventKey={2}>{language.index_generate}</NavItem>
                </LinkContainer>
                <LinkContainer to="/topics">
                    <NavItem eventKey={3}>{language.index_topics}</NavItem>
                </LinkContainer>
            </Nav>

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