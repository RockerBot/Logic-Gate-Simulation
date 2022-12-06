import React, { Component } from 'react'
import { DIM } from '../Constants';

export default class Input extends Component {

    constructor(props){
        super(props);
        this.state = {
            input:props.parent.state.cps.max,
            clk:props.parent,
        }
        this.handleEnteringInput = this.handleEnteringInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        var cps = this.state.clk.state.cps;
        cps.max = this.state.input;
        this.state.clk.setState({showInput:false, cps:cps})
    }

    handleEnteringInput(e) {
        this.setState({input:parseInt(e.target.value)})
    }

    render() {
        return(
            <div className="input">
                <input type="number" onChange={this.handleEnteringInput} onKeyUp={e=>{if(e.key==='Enter')this.handleSubmit(e)}}
                style={{width:DIM[this.state.clk.state.logic_type].w-10}}
                placeholder={this.state.clk.state.cps.max} value={`${this.state.input}`}/>
                {/* <button onClick={this.handleSubmit}> Submit </button> */}
            </div>
        )
    }
}