import React, { Component } from 'react'
import eventBus from "../EventBus";

export default class SimulateButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            simulating:false,
            broadcastEventId: null,
        }
        this.simulate = this.simulate.bind(this);
    }

    broadcastEvent() {
        eventBus.dispatch("simulate");
    }

    simulate() {
        this.state.simulating = !this.state.simulating;
        if(this.state.simulating == true)
            this.state.broadcastEventId = setInterval(this.broadcastEvent,1000)
        else {
            clearInterval(this.state.broadcastEventId);
            eventBus.dispatch("resetGates"); // If this line is commented it becomes pause button
        }
    }

    render() {
        return(
             <button type="button" onClick={this.simulate}>Click Me!</button> 
        )
    }
}