import React from 'react'
import './generate.css'

class Generate extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.props.addStoneItem(this._nameElement.value, this._ageElement.value)
        alert(this._nameElement.value + ' added')
        this._nameElement.value = ''
        this._ageElement.value = ''
    }

    render(){
        return <div className="gen_content">
            <div className="form_content">
            <form onSubmit={this.onSubmit} >
                Name
                <br />
                <input type="text" required placeholder="name" ref={el => this._nameElement = el}/> 
                <br />
                Age
                <br />
                <input type="number" placeholder="age" ref={el => this._ageElement = el}/> 
                <br />
                <button type="submit"> Sure</button>
            </form>
            </div>
        </div>
    }
}

module.exports = {Generate}