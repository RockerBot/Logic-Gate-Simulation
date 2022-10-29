import React, { Component, Children, cloneElement } from 'react'
import "../css/GateSpace.css"
import Gate from './Gate';

export class GateSpace extends Component {    
    constructor(props){
        super(props);
        this.state = {
            gates: [],
            selected: null,
        };
        this.createGate = this.createGate.bind(this);
    }
    createGate(e){
        if(this.state.selected===null)return;
        var gts = this.state.gates;
        gts.push({logic_type: this.state.selected.state.logic_type, x:e.clientX, y: e.clientY});
        this.state.selected.setState({selected: false});
        this.setState({
            selected:null,
            gates: gts,
        });
    }
    render() {
        return (<div className='Space' onClick={this.createGate}>
            {this.state.gates.map((gate, i)=><Gate logicType={gate.logic_type} parent={this} x={gate.x} y={gate.y} key={i} id={i}/>)}
            {Children.map(this.props.children,child => cloneElement(child, {parent:this}))}{/* currently GateOptions */}
        </div>)
    }
}

export default GateSpace