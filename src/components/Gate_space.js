import React, { Component } from 'react'
import "../css/GateSpace.css"
import Gate from './Gate';

export class GateSpace extends Component {    
    constructor(props){
        super(props);
        this.state = {
            gates: [],

        };
    }
    dragStart(e){

    }
    drop(e){

    }
    createGate(logicType){
        return(<Gate logicType={logicType}/>);
    }
    render() {
        return (
            <div>GateSpace</div>
        )
    }
}

export default GateSpace