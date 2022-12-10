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
    this.direc = this.direc.bind(this);
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
  direc(facing){
    switch(facing){
      case 3: return { x:  0, y: -1 };
      case 2: return { x: -1, y:  0 };
      case 1: return { x:  0, y:  1 };
      case 0: return { x:  1, y:  0 };
      default:console.log("ERR facing: ", facing);
    }
  }
  render() {
    var me = this.state;
    var width = Math.abs(me.frm.x - me.to.x);
    var height = Math.abs(me.frm.y - me.to.y);
    var isDownward = (me.frm.y<me.to.y);
    var isRightward = (me.frm.x<me.to.x);
    var frm = this.direc(me.in.state.facing);
    var to = this.direc((me.out===undefined)?0:me.out.state.facing);
    return (
      <div className='Line' onContextMenu={this.deleteLineOnly} style={{
          width: width * 2, 
          height: height * 2, 
          left: (isRightward?me.frm.x:me.to.x) - width/2, 
          top: (isDownward?me.frm.y:me.to.y) - height/2,
          zIndex: -1
        }}><div className='debug-line debug'>{`${me.on} [${me.id}]`}</div>{/*//! delet this div */}
        <svg
        width={width * 2} 
        height={height * 2}>
          <path fill='none'
          strokeDasharray={this.props.dashes?"7,5":"none"}          
          stroke={me.on?"cyan":"black"}
          d={`
          M ${width/2 + (isRightward?0:width)},                 ${height/2 + (isDownward?0:height)} 
          C ${width/2 + (isRightward?0:width) + frm.x*width/2}, ${height/2 + (isDownward?0:height) + frm.y*height/2} 
            ${width/2 + (isRightward?width:0) - to.x*width/2},  ${height/2 + (isDownward?height:0) - to.y*height/2} 
            ${width/2 + (isRightward?width:0)},                 ${height/2 + (isDownward?height:0)}
        `} />
        </svg>
      </div>
    )
  }
}

export default Line