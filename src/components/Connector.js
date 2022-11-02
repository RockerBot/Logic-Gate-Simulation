import React, { Component } from 'react'
import "../css/ConnectLine.css"

export class ConnectorIn extends Component {
  constructor(props){
    super(props)
    this.state={
      x: props.x,
      y: props.y,
      gate: props.gate,
      gateSpace: props.gateSpace,
      line: null,
    }
    this.createLine = this.createLine.bind(this);
  }
  componentDidMount() {
    var gate = this.state.gate;
    var cnt = gate.state.cntIn;
    cnt[this.props.id] = this;
    gate.setState({cntIn:cnt})
  }
  createLine(e){
    if(!("which" in e && e.which ==1 || "button" in e &&e.button==0))return;
    this.state.gateSpace.drawLineEnd(e.clientX, e.clientY, this);
    e.preventDefault();
  }
  render() {
    var stl={
      left: this.state.x,
      top: this.state.y,
    }
    return (<div style={stl} className='Connector cin' 
    onMouseUp={this.createLine}>
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
      gate: props.gate,
      gateSpace: props.gateSpace,
      lines: {},
    }
    this.createLine = this.createLine.bind(this);
  }
  componentDidMount() {
    var gate = this.state.gate;
    var cnt = gate.state.cntOut;
    cnt[this.props.id] = this;
    gate.setState({cntOut:cnt})
  }
  createLine(e){
    // console.log("test", e);
    if(!("which" in e && e.which ==1 || "button" in e &&e.button==0))return;
    // console.log("YES");
    this.state.gateSpace.drawLineStart(e.clientX, e.clientY, this);
    e.preventDefault();
  }
  render() {
    var stl={
      left: this.state.x,
      top: this.state.y,
    }
    return (<div style={stl} className='Connector cout' 
    onMouseDown={this.createLine}>
      <img width={20} height={20} src={require(`../res/Connector.png`)} alt="OUT"/>
    </div>)
  }
}
