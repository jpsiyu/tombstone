import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, NavLink as Link} from 'react-router-dom'
import './index.css'

import {StoneList} from './stone.jsx'
import {Generate} from './generate.jsx'

const About = () => <p>About</p>
const Topics = () => <p>Topics</p>

class App extends React.Component{
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

          <Route exact path="/" component={StoneList}/>
          <Route path="/Generate" component={Generate} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
)