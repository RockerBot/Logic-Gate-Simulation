import React, { Component } from 'react'
import "../css/GateSpace.css"
import { ConnectorIn, ConnectorOut } from './Connector';
import { CNT_IN_POS, NAME, CNT_OUT_POS, DIM, CONNECTOR, GTYPE, INS, OUTS } from "../Constants";
import Input from './Input';

export class Gate extends Component {
    constructor(props){
        super(props);
        this.state = {
            logic_type: props.logicType,
            parent: props.parent,
            on: false,
            id: props.id,
            x: props.x,
            y: props.y,
            dx: 0,
            dy: 0,
            dragging: false,
            in: [],
            out: [],
            cntIn: {},
            cntOut: {},
            showInput:false,
            cps:{
                tick:5,
                max:5,
            },
        };
        this.dragStart = this.dragStart.bind(this);
        this.dragMid = this.dragMid.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.deleteGate = this.deleteGate.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.default = this.default.bind(this);
        this.calc = this.calc.bind(this);
    }
    componentDidMount(){
        var gateSpace = this.state.parent;
        var gtcs = gateSpace.state.gateComps;
        gtcs[this.state.id] = this;
        var stchs = gateSpace.state.switches
        if(this.state.logic_type===GTYPE.SWITCH)stchs.push(this)
        gateSpace.setState({
            gateComps: gtcs,
            hasClock: (this.state.logic_type===GTYPE.CLOCK)?this:gateSpace.state.hasClock,
            switches: (this.state.logic_type===GTYPE.SWITCH)?stchs:gateSpace.state.switches,
        });
        this.setState({in:[...INS[this.state.logic_type]], out:[...OUTS[this.state.logic_type]]});
    }
    componentWillUnmount(){
        var gateSpace = this.state.parent;
        var gtcs = gateSpace.state.gateComps;
        delete gtcs[this.state.id];
        var stchs = gateSpace.state.switches;
        if(this.state.logic_type===GTYPE.SWITCH){
            for(let i in stchs){
                if(stchs[i].state.id!==this.state.id)continue;
                stchs.pop(i);
                break;
            }
        }
        gateSpace.setState({
            gateComps: gtcs,
            switches: stchs,
            hasClock: (this.state.logic_type===GTYPE.CLOCK)?null:gateSpace.hasClock,
        });
    }
    calc(){
        var outList = [];
        var on_val = this.state.on;
        var cps = this.state.cps;
        if(this.state.logic_type===GTYPE.AND)outList.push(this.state.in[0] && this.state.in[1]);
        else if(this.state.logic_type===GTYPE.NAND)outList.push(!(this.state.in[0] && this.state.in[1]));
        else if(this.state.logic_type===GTYPE.OR)outList.push(this.state.in[0] || this.state.in[1]);
        else if(this.state.logic_type===GTYPE.NOR)outList.push(!(this.state.in[0] || this.state.in[1]));
        else if(this.state.logic_type===GTYPE.XOR)outList.push(this.state.in[0] ^ this.state.in[1]);
        else if(this.state.logic_type===GTYPE.XNOR)outList.push(!(this.state.in[0] ^ this.state.in[1]));
        else if(this.state.logic_type===GTYPE.NOT)outList.push(!this.state.in[0]);
        else if(this.state.logic_type===GTYPE.BUFFER)outList.push(this.state.in[0]);
        else if(this.state.logic_type===GTYPE.SWITCH)outList.push(this.state.on);
        else if(this.state.logic_type===GTYPE.LED)on_val=this.state.in[0];
        else if(this.state.logic_type===GTYPE.CLOCK){
            cps.tick = (cps.tick+1)%(cps.max*2);
            outList.push(!(cps.tick < cps.max))
        }
        else if(this.state.logic_type===GTYPE.SRFF){
            // Q = !CLK&&Q||CLK&&S||!R&&Q
            outList.push(
                (!this.state.in[2]&& this.state.out[0]) || 
                (this.state.in[2]&&this.state.in[0]) || 
                (!this.state.in[1]&&this.state.out[0])
            );
            outList.push(!this.state.out[0]);
        }else if(this.state.logic_type===GTYPE.DFF){
            //Q = !CLK&&Q||CLK&&D
            outList.push(
                (!this.state.in[1]&&this.state.out[0])||
                (this.state.in[1]&&this.state.in[0])
            );
            outList.push(!this.state.out[0]);
        }else if(this.state.logic_type===GTYPE.JKFF){
            //Q = !(K&&CLK)&&Q||CLK&&J&&!Q
            outList.push(
                (!(this.state.in[1]&&this.state.in[2])&&this.state.out[0])||
                (  this.state.in[0]&&this.state.in[2]&&!this.state.out[0])
            );
            outList.push(!this.state.out[0]);
        }else if(this.state.logic_type===GTYPE.TFF){
            //Q = !(T&&CLK)&&Q||CLK&&T&&!Q
            outList.push(
                (!(this.state.in[0]&&this.state.in[1])&&this.state.out[0])||
                (  this.state.in[0]&&this.state.in[1]&&!this.state.out[0])
            );
            outList.push(!this.state.out[0]);
        }
        this.setState({out:outList, on:on_val, cps:cps});
        // for(let i in outList)this.state.cntOut[i].setState({on: outList[i]});
    }
    toggleState(e){
        if (this.state.logic_type === GTYPE.SWITCH)this.setState({on: !this.state.on});
        else if (this.state.logic_type === GTYPE.CLOCK)this.setState({showInput: !this.state.showInput});
    }
    dragStart(e){
        var dx = e.clientX - e.currentTarget.getBoundingClientRect().left;
        var dy = e.clientY - e.currentTarget.getBoundingClientRect().top;
        var dxx = e.currentTarget.getBoundingClientRect().right-e.clientX;
        var dyy = e.currentTarget.getBoundingClientRect().bottom-e.clientY;
        if(dy<=5||dyy<=5||dx<=5||dxx<=5)return;
        var z = this.state.parent.state.zdx;
        z[z.indexOf(this.state.id)] = z[z.length-1];
        z[z.length-1] = this.state.id;
        this.state.parent.setState({
            zdx:z,
            draggingGate: this,
        });
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
        for (let i in this.state.cntIn){
            if(this.state.cntIn[i].state.line)
                this.state.cntIn[i].state.line.setState({to:{
                    x:lft, 
                    y:top+CNT_IN_POS[this.state.logic_type][i].y+CONNECTOR.h/2
                }});
        }
        for (let inNode in this.state.cntOut){
            var lines = this.state.cntOut[inNode].state.lines;
            if(!lines)continue;
            for (let lneNo in lines){
                lines[lneNo].setState({frm:{
                    x:lft+DIM[this.state.logic_type].w,
                    y:top+CNT_OUT_POS[this.state.logic_type][inNode].y+CONNECTOR.h/2
                }});
            }
        }
    }
    dragEnd(e){
        this.setState({dragging: false});
        this.state.parent.setState({draggingGate: null});
    }
    default(){
        if(this.state.logic_type!==GTYPE.SWITCH)
            this.setState({on:false});
    }
    deleteGate(e){
        if(!(("which" in e && e.which === 3) || ("button" in e && e.button === 2)))return;
        var gateSpace = this.state.parent
        var gates = gateSpace.state.gates;

        for (let i in this.state.cntIn){
            if(this.state.cntIn[i].state.line)
            this.state.cntIn[i].state.line.deleteLine(this.state.id);
        }
        for (let inNode in this.state.cntOut){
            var lines = this.state.cntOut[inNode].state.lines;
            if(!lines)continue;
            for (let lneNo in lines)
            lines[lneNo].deleteLine(this.state.id);
        }
        delete gates[this.state.id];
        this.state.parent.setState({gates: gates});

        e.preventDefault();
    }
    render() {
        var style = {
            left: this.state.x,
            top: this.state.y,
            zIndex: this.state.parent.state.zdx.indexOf(this.state.id),
        }
        var imgName = NAME[this.state.logic_type];
        var dim = DIM[this.state.logic_type];
        var clock_elem = null;
        var debug_elem = <div className='debug-gate debug'>{`${this.state.on} [${this.state.id}]`}{/*//! delet this div */}</div>
        if(!this.state.on)imgName = imgName.replace("ON", "OFF");
        if(this.state.logic_type === GTYPE.CLOCK) {
            debug_elem = <div className='debug-gate debug'>{`${this.state.on} [${this.state.id}] ${this.state.cps.tick}/${this.state.cps.max}`}{/*//! delet this div */}</div>;
            clock_elem = <svg width={dim.w} height={dim.h} className='clock_counter'>
                <path strokeWidth={7} strokeLinecap="round" fill='none' strokeDasharray="100 100" 
                stroke={`${this.state.cps.tick<this.state.cps.max?'cyan':'gray'}`}                
                d={`M${dim.w/2} ${(dim.h-31.831)/2} a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}/>
                <path strokeWidth={7} strokeLinecap="round" fill='none'
                stroke={`${this.state.cps.tick<this.state.cps.max?'gray':'cyan'}`}
                strokeDasharray={`${100*(this.state.cps.tick%this.state.cps.max + 1)/this.state.cps.max} 100`}
                d={`M${dim.w/2} ${(dim.h-31.831)/2} a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}/>
            </svg>
        }
        return (<div className='Gate' style={style}
            onMouseDown={this.dragStart} 
            onMouseMove={this.dragMid} 
            onMouseUp={this.dragEnd}
            onContextMenu={this.deleteGate}
            onDoubleClick={this.toggleState}
            >
                {clock_elem}
                {debug_elem}
                <img width={dim.w} height={dim.h}
                src={require(`../res/${imgName}.png`)}
                alt={NAME[this.state.logic_type]}/>
                {CNT_IN_POS[this.state.logic_type].map(
                    (l_type, i)=><ConnectorIn gate={this} x={l_type.x} y={l_type.y} key={i} id={i} gateSpace={this.state.parent}/>
                )}                
                {CNT_OUT_POS[this.state.logic_type].map(
                    (l_type, i)=><ConnectorOut gate={this} x={l_type.x} y={l_type.y} key={i} id={i} gateSpace={this.state.parent}/>
                )}
                {this.state.showInput && <Input parent={this}/>}
        </div>)
    }
}

export default Gate