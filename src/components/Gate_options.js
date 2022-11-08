import React, { Component } from 'react'
import "../css/GateOptions.css"
import { NAME, DIM } from '../Constants';
// import Draggable from 'react-draggable'

export class GateOptions extends Component {
  constructor(props){
    super(props);
    this.side = this.props.side;
    this.elems = this.props.elems;
  }
  render() {
    return (<div className={"preview ".concat((this.side==='right')?"stick_right":"stick_left")} onClick={e=>e.stopPropagation()}>
      <h3>GateOptions</h3>
      <div className='GatePreview_container'>
        {this.elems.map(val =><GatePreview key={val} logicType={val} parent={this.props.parent}/>)}
      </div>
    </div>)
  }
}

class GatePreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      logic_type: props.logicType,
      parent: props.parent,
      selected: false,
    };
    this.setSelect = this.setSelect.bind(this);
  }
  setSelect(e){
    if(this.state.parent.state.selected!==null)
      this.state.parent.state.selected.setState({selected: false});
    this.state.parent.setState({selected: this});
    this.setState({selected: true});
    e.stopPropagation();
    console.log("OOOOF")
  }
  render() {
    return (<div className={`GatePreview ${this.state.selected?"selected":""}`} onClick={this.setSelect}>
      <img width={DIM[this.state.logic_type].w} height={DIM[this.state.logic_type].h}
        src={require(`../res/${NAME[this.state.logic_type]}.png`)}
        alt={NAME[this.state.logic_type]}        
      />
      {NAME[this.state.logic_type]}
    </div>)
  }
}

export default GateOptions