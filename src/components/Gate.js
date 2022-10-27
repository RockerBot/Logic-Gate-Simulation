import React, { Component } from 'react'

export class Gate extends Component {
    constructor(props){
        super(props);
        this.state = {
            logic_type: props.logicType,
            x:props.x,
            y:props.y,
            in:[],
            out:[],
        };
    }
    
    render() {
    return (<div>
        {this.state.logic_type}
    </div>)
  }
}

export default Gate