import React, { Component } from 'react'
import "../css/TopNav.css"

export class TopNav extends Component {
  render() {
    return (<div className='top_nav'>
        <div ><a href='https://www.google.com/'>
            <img width="30px" height="30px" src={require("../res/Person.png")}/>
            </a></div>
    </div>)
  }
}

export default TopNav