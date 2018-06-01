import React from 'react'

class Generate extends React.Component{
    constructor(){
        super()
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event){
        event.preventDefault()
        this.props.addStoneItem(
            this._nameElement.value, 
            this._ageElement.value, 
            [this._lng.value, this._lat.value],
        )
        alert(this._nameElement.value + ' added')
        this._nameElement.value = ''
        this._ageElement.value = ''
        this._lng.value = ''
        this._lat.value = ''
    }

    render(){
        return <div className="gen_content">
            <div className="form_content">
            <form onSubmit={this.onSubmit} >
                Name
                <br />
                <input className="normal" type="text" required placeholder="name" ref={el => this._nameElement = el}/> 
                <br />
                Age
                <br />
                <input className="normal" type="number" placeholder="age" ref={el => this._ageElement = el}/> 
                <br />
                <br />
                Location
                <br />
                Lng<input className="location" type="number" placeholder="longitude" ref={el => this._lng= el}/> 
                Lat<input className="location" type="number" placeholder="latitude" ref={el => this._lat= el}/> 
                <br />
                <button type="submit"> Sure</button>
            </form>
            </div>
        </div>
    }
}

module.exports = {Generate}