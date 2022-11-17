import React, { Component } from 'react'

export default class Input extends Component {

    constructor(props){
        super(props);
        this.state = {
            input:"5",
            clk:props.parent,
        }
        this.handleEnteringInput = this.handleEnteringInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        this.state.clk.setState({showInput:false, cps:this.state.input})
    }

    handleEnteringInput(event) {
        this.setState({input:event.target.value})
    }

    render() {
        return(
            <div className="input" style={this.props.style}>
                <input type="text" placeholder="5" value={this.state.input} onChange={this.handleEnteringInput}/>
                <button onClick={this.handleSubmit}> Submit </button>
            </div>
        )
    }
}