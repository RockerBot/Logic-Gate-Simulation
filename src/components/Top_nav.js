import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "../css/TopNav.css"
import Form from './signup'


export class TopNav extends Component {
  constructor(props){
    super(props);
    this.state={
      signin:false
    }    
  }
  render() {
    var elem
    if (this.state.signin)
      elem =<Link to="/" onClick={()=>this.setState({signin:false})} draggable={false}>
              <div className='personcontainer'>
                <img id='personimg' alt='person:)' src={require("../res/1.jpg")} draggable={false}/>
              </div>
            </Link>
    else
      elem =<Link to="/signin" onClick={()=>this.setState({signin:true})} draggable={false}>
              <div className='personcontainer'>
                <img id='personimg' alt='person:)' src={require("../res/1.jpg")} draggable={false}/>
              </div>
            </Link>

    return (<Router>
		<div className='top_nav' id='top_nav_id'> 
        {elem}
		</div>
		<Routes>
				<Route exact path='/' element={this.props.children}></Route>
				<Route exact path='/signin' element={<Form />}></Route>
		</Routes>
	</Router>)
  }
}

export default TopNav