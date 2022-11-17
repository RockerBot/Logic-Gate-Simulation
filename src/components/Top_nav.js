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
      elem =<Link to="/" onClick={()=>{
        document.getElementById('SimButton').hidden = false;
        this.setState({signin:false})}}>
              <div className='personcontainer'><img id='personimg' alt='person:)' src={require("../res/1.jpg")}/>
              </div>
            </Link>
    else
      elem =<Link to="/signin" onClick={()=>{
          document.getElementById('SimButton').hidden = true;
          this.setState({signin:true})
        }
        }>
              <div className='personcontainer'>
                <img id='personimg' alt='person:)' src={require("../res/1.jpg")}/>
              </div>
            </Link>

    return (<Router>
		<div className='top_nav'>
        {elem}
        <SimulateButton />
		</div>
		<Routes>
				<Route exact path='/' element={this.props.children}></Route>
				<Route exact path='/signin' element={<Form />}></Route>
		</Routes>
	</Router>)
  }
}

export default TopNav