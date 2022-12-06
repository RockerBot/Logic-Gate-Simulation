import React, { Component } from 'react'
import "../css/ConnectLine.css"

export class Line extends Component {
  constructor(props){
    super(props);
    this.state ={
      frm : {
        x: props.frm.x,
        y: props.frm.y,
      },
      to : {
        x: props.to.x,
        y: props.to.y,
      },
      on: props.on,
      in: props.in,
      out:props.out,
      gateSpace: props.gateSpace,
      id: props.id,
    }
    this.deleteLine = this.deleteLine.bind(this);
    this.deleteLineOnly = this.deleteLineOnly.bind(this);
    this.resetLine = this.resetLine.bind(this);
  }

  resetLine() {
    this.setState({on:false})
  }

  componentDidMount() {
    if(this.state.gateSpace.state.ghostLine !=null){
      let gstln = this.state.gateSpace.state.ghostLine;
      gstln["ln"] = this;
      this.state.gateSpace.setState({ghostLine: gstln});
    }else{
      var outlns = this.state.in.state.lines;
      outlns[this.state.id] = this;
      this.state.in.setState({lines: outlns});
      if(this.state.out.state.line!=null)this.state.out.state.line.deleteLine(this.state.out.state.gate.state.id)
      this.state.out.setState({line: this});
    }
  }
  deleteLine(gateId){
    var lines = this.state.gateSpace.state.lines;
    if(this.state.out.state.gate.state.id === gateId){
      var inlns = this.state.in.state.lines
      delete inlns[this.state.id];
      this.state.in.setState({lines:inlns});
    }else{
      this.state.out.setState({line:null,on:false});
    }
    delete lines[this.state.id]
    this.state.gateSpace.setState({lines:lines});
  }
  deleteLineOnly(e){
    var lines = this.state.gateSpace.state.lines;
    var inlns = this.state.in.state.lines
    delete inlns[this.state.id];
    this.state.in.setState({lines:inlns});
    this.state.out.setState({line:null,on:false});
    delete lines[this.state.id]
    this.state.gateSpace.setState({lines:lines});
    if(e)e.preventDefault();
  }
  render() {
    var width = Math.abs(this.state.frm.x - this.state.to.x);
    var height = Math.abs(this.state.frm.y - this.state.to.y);
    var isDownward = (this.state.frm.y<this.state.to.y);
    var isRightward = (this.state.frm.x<this.state.to.x);
    return (
      <div className='Line' onContextMenu={this.deleteLineOnly} style={{
          width:width, 
          height:height+7, 
          left:(isRightward?this.state.frm.x:this.state.to.x), 
          top:(isDownward?this.state.frm.y:this.state.to.y)-3.5,
          zIndex:-1
        }}><div className='debug-line debug'>{`${this.state.on} [${this.state.id}]`}</div>{/*//! delet this div */}
        <svg
        width={width} 
        height={height+7}>
          <path fill='none'
          strokeDasharray={this.props.dashes?"7,5":"none"}          
          stroke={this.state.on?"cyan":"black"}
          d={`
            M ${isRightward?0:width},${isDownward?3.5:height} 
            C ${width/2},${isDownward?3.5:height} 
            ${width/2},${isDownward?height:3.5} 
            ${isRightward?width:0},${isDownward?height:3.5}
          `} />
        </svg>
      </div>
    )
  }
}

export default Line