import React, { Component } from 'react'
import { DIM, GTYPE } from '../Constants';

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
        var me = this.state;
        var clkStt = me.clk.state;
        const W = DIM[GTYPE.CLOCK].w;
        const H = DIM[GTYPE.CLOCK].h;
        var X=0;
        var Y=0;
        switch(clkStt.rotation){//idk y these numbers
            case 3:{
                X = -23*2 -1;
                Y = 23 + 1;
                break;
            };
            case 2: {
                X=0;
                Y=-23 -1;
                break;
            };
            case 1:  {
                X=-23*2 -1;
                Y=23 + 1;
                break;
            };
            default:  {
                X=0;
                Y=70+1;
            };
        }
        return(<input className="input" type="number" autoFocus
            onChange={this.handleEnteringInput}
            onKeyUp={e=>{if(e.key==='Enter')this.handleSubmit(e)}}
            placeholder={clkStt.cps.max} value={`${me.input}`}
            style={{
                width: W-8, height:17,
                transform: `rotate(${-90*clkStt.rotation}deg)`,
                left: X, top: Y,//(W - (W-10))/2,(H- 17)/2,
            }}/>)
    }
}