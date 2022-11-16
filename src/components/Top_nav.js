import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "../css/TopNav.css"
import Form from './signup'
import SimulateButton from './SimulateButton'

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
      elem =<Link to="/" onClick={()=>this.setState({signin:false})}>
              <img width="30px" height="30px" src={require("../res/Person.png")}/>
            </Link>
    else
      elem =<Link to="/signin" onClick={()=>this.setState({signin:true})}>
                <img width="30px" height="30px" src={require("../res/Person.png")}/>
            </Link>

    return (<Router>
		<div className='top_nav'>
        <SimulateButton />
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