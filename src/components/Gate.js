import React, { Component } from 'react'
import "../css/GateSpace.css"
import { ConnectorIn, ConnectorOut } from './Connector';
import { CNT_IN_POS, NAME, CNT_OUT_POS, DIM } from "../Constants";

export class Gate extends Component {
    constructor(props){
        super(props);
        this.state = {
            logic_type: props.logicType,
            parent: props.parent,
            id: props.id,
            x: props.x,
            y: props.y,
            dx: 0,
            dy: 0,
            dragging: false,
            in: [],
            out: [],
            calc: this.calc.bind(this),
        };
        this.dragStart = this.dragStart.bind(this);
        this.dragMid = this.dragMid.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        console.log(this.state.id, this.state.logic_type);
    }
    calc(){
        var outList = [];
        if(this.state.logic_type==="AND")outList.push(this.state.in[0] && this.state.in[1]);
        else if(this.state.logic_type==="AND")outList.push(!(this.state.in[0] && this.state.in[1]));
        else if(this.state.logic_type==="OR")outList.push(this.state.in[0] || this.state.in[1]);
        else if(this.state.logic_type==="NOR")outList.push(!(this.state.in[0] || this.state.in[1]));
        else if(this.state.logic_type==="XOR")outList.push(this.state.in[0] ^ this.state.in[1]);
        else if(this.state.logic_type==="XNOR")outList.push(!(this.state.in[0] ^ this.state.in[1]));
        else if(this.state.logic_type==="NOT")outList.push(!this.state.in[0]);
        else if(this.state.logic_type==="BUFFER")outList.push(this.state.in[0]);
        else if(this.state.logic_type==="SR Flip Flop"){
            // Q = !CLK&&Q||CLK&&S||!R&&Q
            outList.push(
                (!this.state.in[3]&& this.state.out[0]) || 
                (this.state.in[3]&&this.state.in[0]) || 
                (!this.state.in[1]&&this.state.out[0])
            );
            outList.push(!this.state.out[0]);/// TODO calc
        }else if(this.state.logic_type==="D Flip Flop"){
            //Q = !CLK&&Q||CLK&&D
            outList.push(
                (!this.state.in[1]&&this.state.out[0])||
                (this.state.in[1]&&this.state.in[0])
            );
            outList.push(!this.state.out[0]);
        }else if(this.state.logic_type==="JK Flip Flop"){
            //Q = !(K&&CLK)&&Q||CLK&&J&&!Q
            outList.push(
                (!(this.state.in[1]&&this.state.in[3])&&this.state.out[0])||
                (this.state.in[3]&&this.state.in[0]&&!this.state.out[0])
            );
            outList.push(!this.state.out[0]);
        }else if(this.state.logic_type==="T Flip Flop"){
            //Q = !(T&&CLK)&&Q||CLK&&T&&!Q
            outList.push(
                (!(this.state.in[0]&&this.state.in[1])&&this.state.out[0])||
                (this.state.in[1]&&this.state.in[0]&&!this.state.out[0])
            );
            outList.push(!this.state.out[0]);
        }
        this.setState({out:outList});
    }

    dragStart(e){
        var dx = e.clientX - e.currentTarget.getBoundingClientRect().left;
        var dy = e.clientY - e.currentTarget.getBoundingClientRect().top;
        var dxx = e.currentTarget.getBoundingClientRect().right-e.clientX;
        var dyy = e.currentTarget.getBoundingClientRect().bottom-e.clientY;
        if(dy<=25||dyy<=25||dx<=25||dxx<=25)return;
        this.setState({
            dragging: true,
            dx: dx,
            dy: dy,
        });
    }
    dragMid(e){
        if(!this.state.dragging)return;
        var lft = e.clientX - this.state.dx;
        var top = e.clientY - this.state.dy;
        this.setState({
            x: lft,
            y: top,
        });
    }
    dragEnd(e){
        this.setState({ dragging: false });
    }

    render() {
        var style = {
            left: this.state.x,
            top: this.state.y,
        }
        return (
            <div className='Gate' style={style} 
            onMouseDown={this.dragStart} 
            onMouseMove={this.dragMid} 
            onMouseUp={this.dragEnd}
            >
                <img width={DIM[this.state.logic_type].w} height={DIM[this.state.logic_type].h}
                src={require(`../res/${NAME[this.state.logic_type]}.png`)}
                alt={NAME[this.state.logic_type]}/>
                {CNT_IN_POS[this.state.logic_type].map(
                    (l_type, i)=><ConnectorIn gate={this} x={l_type.x} y={l_type.y} key={i}/>
                )}                
                {CNT_OUT_POS[this.state.logic_type].map(
                    (l_type, i)=><ConnectorOut gate={this} x={l_type.x} y={l_type.y} key={i}/>
                )}                
            </div>
        )
    }
}

export default Gate