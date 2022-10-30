import React, { Component } from 'react'
import "../css/ConnectLine.css"

export class Connector extends Component {
  constructor(props){
    super(props)
    this.state={
      x: props.x,
      y: props.y,
    }
  }
  render() {
    var stl={
      left: this.state.x,
      top: this.state.y,
    }
    return (<div style={stl} className='Connector'>
      Connector 
    </div>)
  }
}

export default Connector