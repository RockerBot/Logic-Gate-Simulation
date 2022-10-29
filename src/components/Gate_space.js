import React, { Component } from 'react'
import "../css/GateSpace.css"
import Gate from './Gate';

export class GateSpace extends Component {    
    constructor(props){
        super(props);
        this.state = {
            gates: [],

        };
        // this.dragStart = this.dragStart.bind(this);
        // this.dragMid = this.dragMid.bind(this);
        // this.drop = this.drop.bind(this);
        // this.test = this.test.bind(this);
    }
    // dragStart(e){
    //     this.setState()
    // }
    // dragMid(e){

    // }
    // dragEnd(e){

    // }
    // test(e){
    //     e = e || window.event;
    //     console.log("IDK", e.pageX);
    //     // e.target.setState({
    //     //     style:{
    //     //         backgroundColor: "brown",
    //     //         position: "absolute",
    //     //         left: 45,
    //     //         top: e.clientY
    //     //     }
    //     // });
    // }
    createGate(logicType){
        return(<Gate logicType={logicType} />);
    }
    render() {
        return (<div className='Space'>
            HIHIHIHI;
            <Gate logicType={"JK Flip Flop"} parent={this} x={250} y={500}/>
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
            {/* <Gate logicType={"AND"} onDrag={this.test} x={500} y={500}/> */}
        </div>)
    }
}

export default GateSpace