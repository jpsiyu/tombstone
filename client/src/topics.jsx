import React from 'react'
import axios from 'axios'

class Topics extends React.Component{
    constructor(){
        super()
        this.state = {
            res: ''
        }
        this.fetchData = this.fetchData.bind(this)
        this.postData = this.postData.bind(this)
    }

    fetchData(){
        axios.get('/api/stones').then(response => {
            console.log(response.data)
            this.setState({
                res: response.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    postData(){
        axios.post('/api/stone', {
            name: 'fre',
            location: [20,30],
            age: 18
        }).then(response => {
            console.log(response)
            this.setState({
                res: response.data.name
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        return <div className="topics_content">
            <button onClick={this.fetchData}>Fetch</button>
            <br />
            <button onClick={this.postData}>Post</button>
            <br />
            <label>res:{this.state.res}</label>
        </div>
    }
}

module.exports = {Topics}