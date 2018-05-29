import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component{
    render(){
        return <div className='content'>
            Hello, Welcome to the Tombstone Records App!
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
)