import React, { Component, Children, cloneElement } from 'react'
import "../css/GateSpace.css"
import Gate from './Gate';
import Line from './Line';
import eventBus from "../EventBus";
import { GTYPE } from "../Constants";

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
            hasClock:null,
            switches: [],
            // stopClockId:null,
        };
        this.createGate = this.createGate.bind(this);
        this.newUUID = this.newUUID.bind(this);
        this.drawLineStart = this.drawLineStart.bind(this);
        this.drawLineMid = this.drawLineMid.bind(this);
        this.drawLineEnd = this.drawLineEnd.bind(this);
        this.drawLineCull = this.drawLineCull.bind(this);
        this.updateGates = this.updateGates.bind(this);
        this.resetGates = this.resetGates.bind(this);
        // this.clockInit = this.clockInit.bind(this);
        this.uuid = -1; 
    }

    // clockInit() {
    //     // console.log("length " + this.state.hasClock.state.out.length)
    //     // console.log(this.state.hasClock.state.out)
    //     console.log("Out LENGTH OUTSIDE")
    //     console.log(this.state.hasClock.state.out.length)

    //     if(this.state.hasClock.state.out.length == 0) {
    //         var temp = this.state.hasClock.state.out
    //         temp.push(0)
    //         console.log("temp")
    //         console.log(temp)
    //         this.state.hasClock.state.out = temp
    //         this.state.hasClock.state.in = temp
    //         console.log("out")
    //         console.log(this.state.hasClock.state.out)
    //         console.log("in")
    //         console.log(this.state.hasClock.state.in)
    //         console.log("Out LENGTH")
    //         console.log(this.state.hasClock.state.out.length)
    //     }
    //     else {
    //         console.log("tree")
    //         this.state.hasClock.setState({
    //             out:[!this.state.hasClock.state.out[0],]
    //         })
    //     }

    //     // console.log(this.state.hasClock)
    // }

    updateGates() {
        var Q = [];
        var visited = [];
        var ele, lines, next; 
        // this.clockInit();
        if(this.state.hasClock != null){
            Q.push(this.state.hasClock);
            visited.push(this.state.hasClock.state.id);
        }
        for(let s of this.state.switches){
            Q.push(s);
            visited.push(s.state.id);
        }
        if ((!Q.length)&&(visited.length !== Object.keys(this.state.gateComps).length)){
            for(let gt in this.state.gateComps){
                if(!visited.includes(this.state.gateComps[gt].state.id)){
                    Q.push(this.state.gateComps[gt]);
                    visited.push(this.state.gateComps[gt].state.id);
                    break;
                }
            }
        }
        while(Q.length > 0) {
            ele = Q.shift();
            ele.calc();//* GATE OUT
            
            for(let oCnt in ele.state.out) {
                let on_val = ele.state.out[oCnt];
                ele.state.cntOut[oCnt].setState({on: on_val});//* GATE OUT-C
                lines = ele.state.cntOut[oCnt].state.lines;
                
                for(let ln in lines){
                    lines[ln].setState({on:on_val});//* LINE
                    lines[ln].state.out.setState({on:on_val});//* GATE IN-C
                    next = lines[ln].state.out.state.gate;

                    var inps = [];
                    for(let i in next.state.in)inps.push(next.state.cntIn[i].state.on)
                    next.setState({in:inps});//* GATE IN
                    if(!visited.includes(next.state.id)){
                        Q.push(next);
                        visited.push(next.state.id);
                    }
                }
            }
            if ((!Q.length)&&(visited.length !== Object.keys(this.state.gateComps).length)){
                for(let gt in this.state.gateComps){
                    if(!visited.includes(this.state.gateComps[gt].state.id)){
                        Q.push(this.state.gateComps[gt]);
                        visited.push(this.state.gateComps[gt].state.id);
                        break;
                    }
                }
            }
        }

    }

    resetGates() {
        var gates = this.state.gateComps
        var cnts;
        var lns;

        for(let gt in gates){
            gates[gt].default();//TODO

            cnts = gates[gt].state.cntIn;
            for(let cnt in cnts)cnts[cnt].setState({on:false});

            cnts = gates[gt].state.cntOut;
            for(let cnt in cnts){
                cnts[cnt].setState({on:false});

                lns = cnts[cnt].state.lines;
                for(let ln in lns)lns[ln].setState({on:false});
            }
        }

        // for(let i = 0; i<gate_length; i++) {
        //     for(let [gateIndex, gate] of Object.entries(gates)) {
        //         gate.setState({in:[], out:[], on:false})
        //         cntOut = gate.state.cntOut;

        //         for(let [cntIndex, cnt] of Object.entries(cntOut)) {
        //             lines = cnt.state.lines;

        //             for(let [lineIndex, line] of Object.entries(lines))
        //                 line.resetLine()
        //         }
        //     }
        // }
    }

    componentDidMount() {
        eventBus.on("simulate", this.updateGates);
        eventBus.on("resetGates", this.resetGates);
    }

    componentWillUnmount() {
        eventBus.remove("simulate");
        eventBus.remove("resetGates");
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
        this.props.cssvar.setProperty('--cout','1');
        this.setState({ ghostLine: null });
    }
    createGate(e){
        if(this.state.selected===null)return;
        if(this.state.selected.state.logic_type===GTYPE.CLOCK && this.state.hasClock != null) {
            console.log("too many clocks")
            this.setState({selected: null});
            return;
        }
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
        if(e.shiftKey && this.state.selected.state.logic_type!==GTYPE.CLOCK){
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