import React, { Component } from 'react'
import eventBus from "../EventBus";

export default class SimulateButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            simulating:false,
            GateEventId: null,
        }
        this.simulate = this.simulate.bind(this);
    }

    broadcastGateEvent() {
        eventBus.dispatch("simulate");
    }

    simulate() {
        const simButt = document.getElementById('SimButton');
        const topnav = document.getElementById('top_nav_id');
        simButt.innerText = simButt.innerText === "Simulate"?"Simulating":"Simulate";
        this.state.simulating = !this.state.simulating;
        // const afterSimButton = window.getComputedStyle(simButt,'::after');
        if(this.state.simulating == true) {
            simButt.style.setProperty('--afterOpacity','0');
            this.state.GateEventId = setInterval(this.broadcastGateEvent,200)
        }
        else {
            simButt.style.setProperty('--afterOpacity','1');
            clearInterval(this.state.GateEventId);
            eventBus.dispatch("resetGates"); // If this line is commented it becomes pause button
        }
    }

    render() {
        return(
            <button type="button" onClick={this.simulate} id="SimButton">Simulate</button>
        )
    }
}