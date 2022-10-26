import React, { Component } from 'react'
import "../css/GateOptions.css"

export class GateOptions extends Component {
  constructor(props){
    super(props);
    this.side = this.props.side;
    this.elems = this.props.elems;
  }
  render() {
    return (<div className={"preview ".concat((this.side==='right')?"stick_right":"stcik_left")}>
      <h3>GateOptions</h3>
      {this.elems.map(val =><GatePreview key={val} logicType={val}/>)};
    </div>)
  }
}

class GatePreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      logic_type: props.logicType,
    };
  }
  render() {
    return (<div className='preview_gate'>
      <img width="100%" height="100%"
        src={require(`../res/${this.state.logic_type}.png`)}
        alt={this.state.logic_type}        
      />
      <hr />
      {this.state.logic_type}
    </div>)
  }
}

export default GateOptions