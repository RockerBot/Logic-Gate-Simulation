import React, { Component } from 'react'
import "../css/ConnectLine.css"
import { CONNECTOR } from '../Constants'

export class ConnectorIn extends Component {
  constructor(props){
    super(props)
    this.state={
      x: props.x,
      y: props.y,
      gate: props.gate,
      gateSpace: props.gateSpace,
      line: null,
      on:false,
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
    if(!(("which" in e && e.which ===1) || ("button" in e &&e.button===0)))return;
    var stt = this.state;
    var gateSpace = stt.gateSpace;
    gateSpace.props.cssvar.setProperty('--cout','1');
    var xy = gateSpace.resolveRotation(stt.gate.state, stt);
    gateSpace.drawLineEnd(xy.x, xy.y, this);
    e.preventDefault();
  }
  render() {
    var stl={
      left: this.state.x - CONNECTOR.w/2,
      top: this.state.y - CONNECTOR.h/2,
    }
    return (<div style={stl} className='Connector cin' onMouseUp={this.createLine}>
      <div className='debug-cnt debug'>{`${this.state.on} [${this.props.id}]`}</div>{/*//! delet this div */}
      <img width={CONNECTOR.w} height={CONNECTOR.h} src={require(`../res/Connector${(this.state.on)?'ON':'OFF'}.png`)} alt="IN"/>
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
      on: false,
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
    if(!(("which" in e && e.which ===1) || ("button" in e &&e.button===0)))return;
    var stt = this.state;
    var gateSpace = stt.gateSpace;
    gateSpace.props.cssvar.setProperty('--cout','-1');
    var xy = gateSpace.resolveRotation(stt.gate.state, stt);
    gateSpace.drawLineStart(xy.x, xy.y, this);
    e.preventDefault();
  }
  render() {
    var stl={
      left: this.state.x - CONNECTOR.w/2,
      top: this.state.y - CONNECTOR.h/2,
    }
    return (<div style={stl} className='Connector cout' onMouseDown={this.createLine}>
      <div className='debug-cnt debug'>{`${this.state.on} [${this.props.id}]`}</div>{/*//! delet this div */}
      <img width={CONNECTOR.w} height={CONNECTOR.h} src={require(`../res/Connector${(this.state.on)?'ON':'OFF'}.png`)} alt="OUT"/>
    </div>)
  }
}
