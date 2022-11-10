import React, { Component, Children, cloneElement } from 'react'
import "../css/GateSpace.css"
import Gate from './Gate';
import Line from './Line';

export class GateSpace extends Component {    
    constructor(props){
        super(props);
        this.state = {
            gates: {},
            gateComps: {},
            lines: {},
            zdx: [],
            selected: null,
            ghostLine: null,
            draggingGate: null,
        };
        this.createGate = this.createGate.bind(this);
        this.newUUID = this.newUUID.bind(this);
        this.drawLineStart = this.drawLineStart.bind(this);
        this.drawLineMid = this.drawLineMid.bind(this);
        this.drawLineEnd = this.drawLineEnd.bind(this);
        this.drawLineCull = this.drawLineCull.bind(this);
        this.uuid = -1; // TODO delete
    }
    newUUID(){
        this.uuid++;
        return this.uuid;
    }
    drawLineStart(x,y, io){
        this.setState({
            ghostLine:{
                frm:{x:x, y:y},
                to:{x:x, y:y},
                in:io,
            },
        });
    }
    drawLineMid(e){
        if(this.state.draggingGate !== null){
            this.state.draggingGate.dragMid(e);
            return;
        }
        if(this.state.ghostLine === null)return;
        var ghstln = this.state.ghostLine;
        ghstln["to"] = {x:e.clientX, y:e.clientY};
        this.setState({ghostLine: ghstln});
        if(this.state.ghostLine.ln!=null)this.state.ghostLine.ln.setState({
            frm : {
                x: ghstln.frm.x,
                y: ghstln.frm.y,
              },
              to : {
                x: ghstln.to.x,
                y: ghstln.to.y,
              },
              on: ghstln.on,
              in: ghstln.in,
              out: ghstln.out,
              gateSpace: ghstln.ln,
        });
    }
    drawLineEnd(x,y, io){
        if(this.state.ghostLine === null)return;
        var uuid = this.newUUID();
        var lns = this.state.lines;
        var frm = this.state.ghostLine.frm;
        var into = this.state.ghostLine.in;
        lns[uuid] = {
            frm: frm,
            to: {x:x, y:y},
            k:uuid,
            in:into,
            out:io,
        };
        this.setState({
            lines: lns,
            ghostLine: null
        });
    }
    drawLineCull(e){
        if(this.state.ghostLine === null)return;
        this.setState({ ghostLine: null });
    }
    createGate(e){
        if(this.state.selected===null)return;
        var gts = this.state.gates;
        var z = this.state.zdx;
        this.uuid++;
        z.push(this.uuid);
        gts[this.uuid]={
            logic_type: this.state.selected.state.logic_type, 
            x: e.clientX, 
            y: e.clientY, 
            k: this.uuid
        }
        if(e.ctrlKey){
            this.setState({
                gates: gts,
                zdx: z,
            });
        }else{
            this.state.selected.setState({selected: false});
            this.setState({
                selected:null,
                gates: gts,
                zdx: z,
            });
        }
    }
    render() {
        var gts = [];
        var lns = [];
        for (let i in this.state.gates)gts.push(this.state.gates[i])
        for (let i in this.state.lines)lns.push(this.state.lines[i])

        return (<div className='Space' 
        onClick={this.createGate} 
        onMouseMove={this.drawLineMid}
        onMouseUp={this.drawLineCull}>
            {gts.map(gate=><Gate logicType={gate.logic_type} parent={this} x={gate.x} y={gate.y} key={gate.k} id={gate.k}/>)}
            {lns.map(line=><Line frm={line.frm} to={line.to} on={false} dashes={false} in={line.in} out={line.out}
            gateSpace={this} key={line.k} id={line.k} />)}

            {this.state.ghostLine !== null && <Line frm={this.state.ghostLine.frm} to={this.state.ghostLine.to}
            on={false} dashes={true} in={this.state.ghostLine.in} out={this.state.ghostLine.out} gateSpace={this}/>}
            {Children.map(this.props.children,child => cloneElement(child, {parent:this}))}{/* currently GateOptions */}
        </div>)
    }
}

export default GateSpace