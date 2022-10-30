import React, { Component } from 'react'
import "../css/ConnectLine.css"

export class ConnectorIn extends Component {
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
    return (<div style={stl} className='Connector cin'>
      <img width={20} height={20} src={require(`../res/Connector.png`)} alt="IN"/>
    </div>)
  }
}
export class ConnectorOut extends Component {
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
    return (<div style={stl} className='Connector cout'>
      <img width={20} height={20} src={require(`../res/Connector.png`)} alt="OUT"/>
    </div>)
  }
}
