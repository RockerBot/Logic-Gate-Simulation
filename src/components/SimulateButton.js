import React, { Component } from 'react'
import eventBus from "../EventBus";
import "../css/GateOptions.css"

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
        // const afterSimButton = window.getComputedStyle(simButt,'::after');
        if(this.state.simulating) {
            clearInterval(this.state.GateEventId);
            this.setState({
                simulating: false,
                GateEventId: null,
            });
            eventBus.dispatch("resetGates");// If this line is commented it becomes pause button            
        }
        else {
            this.setState({
                simulating: true,
                GateEventId : setInterval(this.broadcastGateEvent,200)
            });
        }
    }

    render() {
        return(<div className='simulateButtonContainer'>
            <button className={`SimButton SimButton${(this.state.simulating)?'Zero':'One'}`}
            type="button" onClick={this.simulate}>
                {(this.state.simulating)?"Simulating":"Simulate"}
            </button>
        </div>)
    }
}