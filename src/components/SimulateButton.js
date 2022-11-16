import React, { Component } from 'react'
import eventBus from "../EventBus";

export default class SimulateButton extends Component {

    constructor(props){
        super(props);
    }

    simulate() {
        setInterval(()=>{eventBus.dispatch("simulate");},1000)
        // eventBus.dispatch("simulate");
    }

    render() {
        return(
             <button type="button" onClick={this.simulate}>Click Me!</button> 
        )
    }
}