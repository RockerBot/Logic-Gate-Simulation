import React, { Component } from 'react'
import "../css/GateSpace.css"
var ID = 0;
export class Gate extends Component {
    constructor(props){
        super(props);
        ID+=1;
        this.state = {
            logic_type: props.logicType,
            parent: props.parent,
            id:ID,
            x:props.x,
            y:props.y,
            dx:0,
            dy:0,
            dragging: false,
            in:[],
            out:[],
            calc:this.calc.bind(this),
        };
        this.dragStart = this.dragStart.bind(this);
        this.dragMid = this.dragMid.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        console.log(ID,this.state.id, );
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
        this.setState({
            dragging: true,
            dx: e.clientX - e.currentTarget.getBoundingClientRect().left,
            dy: e.clientY - e.currentTarget.getBoundingClientRect().top,
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
            // backgroundColor: "brown",
            position: "absolute",
            WebkitUserSelect: "none", /* Safari */
            MsUserSelect: "none", /* IE 10 and IE 11 */
            userSelect: "none", /* Standard syntax */
            left: this.state.x,
            top: this.state.y,
        }
        
        return (
            <div className='gate' style={style} 
            onMouseDown={this.dragStart} 
            onMouseMove={this.dragMid} 
            onMouseUp={this.dragEnd}>
                <img width="100" height="50"
                src={require(`../res/${this.state.logic_type}.png`)}
                alt={this.state.logic_type}/>
            </div>
        )
    }
}

export default Gate