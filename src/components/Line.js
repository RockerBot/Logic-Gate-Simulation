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
      in:props.in,
      out:props.out,
      gateSpace: props.gateSpace,
      id: props.id,
    }
  }
  componentDidMount() {
    if(this.state.gateSpace.state.ghostLine !=null){
      let gstln = this.state.gateSpace.state.ghostLine;
      gstln["ln"] = this;
      this.state.gateSpace.setState({ghostLine: gstln});
    }
  }
  render() {
    var width = Math.abs(this.state.frm.x - this.state.to.x);
    var height = Math.abs(this.state.frm.y - this.state.to.y);
    var isDownward = (this.state.frm.y<this.state.to.y);
    console.log(
      {width:width, height:height},
      {x:this.state.frm.x, y:this.state.frm.y},
      {x:this.state.to.x, y:this.state.to.y}
    );
    return (
      <div style={{width:width, height:height+7, left:this.state.frm.x, top:(isDownward?this.state.frm.y:this.state.to.y)-3.5}}className='Line'>
        <svg
        width={width} 
        height={height+7}>
          <path 
          strokeDasharray={this.props.dashes?"7,5":"none"}
          fill='none'
          stroke={this.state.on?"cyan":"black"} 
          strokeWidth="5"
          d={`
          M 0,${isDownward?3.5:height} 
          C ${width/2},${isDownward?3.5:height} 
          ${width/2},${isDownward?height:3.5} 
          ${width},${isDownward?height:3.5}
          `} />
        </svg>
      </div>
    )
  }
}

export default Line