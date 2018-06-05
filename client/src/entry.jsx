import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import Register from './register.jsx'
import Login from './login.jsx'
import {language} from './language.js'
import Navigation from './navigation.jsx'
import {
    Row,
    Col,
    Image,
} from 'react-bootstrap'
import Middle from './middle.jsx'

class AppRouter extends React.Component{
    render(){
        return <Router>
            <div>
                <Route exact path="/" component={AppEntry} />
                <Route path="/register" component={() => <Middle><Register /></Middle>} />
            </div>
        </Router>
    }
}

class AppEntry extends React.Component{
    render(){
        const divStyle = {
            backgroundImage: "url('./res/bg.png')"
        }
        const textStyle = {
            color: 'white'
        }
        return <div style={divStyle} >
            <Navigation forEntry={true}/>
            <Row>
                <Col sm={4} smOffset={1}>
                    <h1 style={textStyle}>{language.main_word}</h1>
                    <p style={textStyle}>{language.main_desc}</p>
                </Col>
                <Col sm={4} smOffset={1}><Login /></Col>
            </Row>
        </div> 
    }
}

ReactDOM.render(
    <AppRouter/>,
    document.getElementById('entry')
)