import React, { Component } from 'react'
import "../css/GateSpace.css"
import { ConnectorIn, ConnectorOut } from './Connector';
import { CNT_IN, NAME, CNT_OUT, DIM, GTYPE, INS, OUTS } from "../Constants";
import Input from './Input';

export class Gate extends Component {
    constructor(props){
        super(props);
        this.state = {
            logic_type: props.logicType,
            parent: props.parent,
            id: props.id,
            x: props.x,
            y: props.y,
            on: false,
            rotation: 0,

            dx: 0,
            dy: 0,
            dragging: false,

            in: [],
            out: [],
            cntIn: {},
            cntOut: {},

            prevClk: 0,
            showInput:false,
            cps:{tick:5, max:5},
        };
        this.dragStart = this.dragStart.bind(this);
        this.dragMid = this.dragMid.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.deleteGate = this.deleteGate.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.rotate = this.rotate.bind(this);
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
        var pCLK = this.state.prevClk;
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
            let CLK = this.state.in[2]&&(this.state.in[2]^pCLK)// pos edge
            pCLK = this.state.in[2];
            let Q = this.state.out[0];
            let S = this.state.in[0];
            let R = this.state.in[1];
            outList.push((!CLK&&Q) || (CLK&&S) || (!R&&Q));
            outList.push(!Q);
        }else if(this.state.logic_type===GTYPE.DFF){
            //Q = !CLK&&Q||CLK&&D
            let CLK = this.state.in[1]&&(this.state.in[1]^pCLK)// pos edge
            pCLK = this.state.in[1];
            let Q = this.state.out[0];
            let D = this.state.in[0];
            outList.push((!CLK&&Q)||(CLK&&D));
            outList.push(!Q);
        }else if(this.state.logic_type===GTYPE.JKFF){
            //Q = !(K&&CLK)&&Q||CLK&&J&&!Q
            let CLK = this.state.in[2]&&(this.state.in[2]^pCLK)// pos edge
            pCLK = this.state.in[2];
            let Q = this.state.out[0];
            let J = this.state.in[0];
            let K = this.state.in[1];
            outList.push((!(K&&CLK)&&Q)||(J&&CLK&&!Q));
            outList.push(!Q);
        }else if(this.state.logic_type===GTYPE.TFF){
            //Q = !(T&&CLK)&&Q||CLK&&T&&!Q
            let CLK = this.state.in[1]&&(this.state.in[1]^pCLK)// pos edge
            pCLK = this.state.in[1];
            let Q = this.state.out[0];
            let T = this.state.in[0];
            outList.push((!(T&&CLK)&&Q)||(T&&CLK&&!Q));
            outList.push(!Q);
        }
        this.setState({out:outList, on:on_val, cps:cps, prevClk:pCLK});
        // for(let i in outList)this.state.cntOut[i].setState({on: outList[i]});
    }
    toggleState(e){
        if (this.state.logic_type === GTYPE.SWITCH)this.setState({on: !this.state.on});
        else if (this.state.logic_type === GTYPE.CLOCK)this.setState({showInput: !this.state.showInput});
    }
    dragStart(e){
        var dx = e.clientX - this.state.x//e.currentTarget.getBoundingClientRect().left;
        var dy = e.clientY - this.state.y//e.currentTarget.getBoundingClientRect().top;
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
        var stt = this.state;
        if(!stt.dragging)return;
        var lft = e.clientX - stt.dx;
        var top = e.clientY - stt.dy;
        this.setState({ x: lft, y: top });
        for (let i in stt.cntIn){
            let cntState = stt.cntIn[i].state;
            if(cntState.line)
                cntState.line.setState({ to:stt.parent.resolveRotation({...stt, x:lft, y:top}, cntState) });
        }
        for (let inNode in stt.cntOut){
            let cntState = stt.cntOut[inNode].state;
            var lines = cntState.lines;
            if(!lines)continue;
            for (let lneNo in lines)
                lines[lneNo].setState({ frm:stt.parent.resolveRotation({...stt, x:lft, y:top}, cntState) });
        }
    }
    dragEnd(e){
        this.setState({dragging: false});
        this.state.parent.setState({draggingGate: null});
    }
    rotate(e){
        if(!e.deltaY)return;
        if(this.state.showInput)return;
        var stt = this.state;
        var rot =(stt.rotation + 4 + e.deltaY/Math.abs(e.deltaY))%4;
        this.setState({ rotation: rot });
        for (let i in stt.cntIn){
            let cntState = stt.cntIn[i].state;
            stt.cntIn[i].setState({ facing:rot });
            if(cntState.line)
                cntState.line.setState({ to:stt.parent.resolveRotation({...stt, rotation:rot}, cntState) });
        }
        for (let inNode in stt.cntOut){
            let cntState = stt.cntOut[inNode].state;
            stt.cntOut[inNode].setState({ facing:rot });
            var lines = cntState.lines;
            if(!lines)continue;
            for (let lneNo in lines)  
                lines[lneNo].setState({ frm:stt.parent.resolveRotation({...stt, rotation:rot}, cntState) });
        }
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
        var imgName = NAME[this.state.logic_type];
        var dim = DIM[this.state.logic_type];
        var style = {
            left: this.state.x,
            top: this.state.y,
            width: dim.w,
            height: dim.h,
            zIndex: this.state.parent.state.zdx.indexOf(this.state.id),
            transform: `rotate(${90*this.state.rotation}deg)`
        }
        var clock_elem = null;
        var debug_elem = <div className='debug-gate debug'>{`${this.state.on} [${this.state.id}]`}{/*//! delet this div */}</div>
        if(!this.state.on)imgName = imgName.replace("ON", "OFF");
        if(this.state.logic_type === GTYPE.CLOCK) {
            debug_elem = <div className='debug-gate debug'>{`${this.state.on} [${this.state.id}] ${this.state.cps.tick}/${this.state.cps.max}`}{/*//! delet this div */}</div>;
            clock_elem = <svg width={dim.w} height={dim.h} className='clock_counter'
            style={{transform: `rotate(${-90*this.state.rotation}deg)`, zIndex: 10}}>
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
            onWheel={this.rotate}
            >
                {clock_elem}
                {debug_elem}
                <img width={dim.w} height={dim.h}
                style={{transform: `rotate(${-90*this.state.rotation*(this.state.logic_type===GTYPE.SWITCH)}deg)`}}
                src={require(`../res/${imgName}.png`)}
                alt={NAME[this.state.logic_type]}/>
                {CNT_IN[this.state.logic_type].map(
                    (l_type, i)=><ConnectorIn gate={this} x={l_type.x} y={l_type.y} key={i}
                                    id={i} facing={l_type.facing} gateSpace={this.state.parent}/>
                )}                
                {CNT_OUT[this.state.logic_type].map(
                    (l_type, i)=><ConnectorOut gate={this} x={l_type.x} y={l_type.y} key={i}
                                    id={i} facing={l_type.facing} gateSpace={this.state.parent}/>
                )}
                {this.state.showInput && <Input parent={this}/>}
        </div>)
    }
}

export default Gate