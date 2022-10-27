import React, { Component } from 'react'
import "../css/ScalingImg.css"

export class ScalingImg extends Component {
    constructor(props){
        super(props);
        this.state = {
            src: props.src,
            alt: props.alt,
        };
        this.new_width = props.width;
        this.new_height = props.new_height;
        this.getMyWidth = this.getMyDim.bind(this)
    }
    getMyDim({target:img}){
        // var ht = img.offsetHeight;
        img.width = this.new_width;
        img.height = this.new_height;
    };
    render() {
        return (<img
        src={this.state.src} alt={this.state.alt} onLoad={this.getMyDim}>
            {this.props.children}
        </img>);
    }
}

export default ScalingImg