import React from 'react'
import axios from 'axios'
import {language} from './language.js'

class Topics extends React.Component{
    constructor(){
        super()
    }

    render(){
        return <div> 
            {language.topics_wait}
        </div>
    }
}

module.exports = {Topics}